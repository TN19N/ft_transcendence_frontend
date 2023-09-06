import { SendIcon} from './Icons';
import Box_message from './BoxMsg';
import { useEffect,useState} from "react";
import axios from 'axios';
import Avatar from '../assets/playerIcon.svg';
import { errorMsg } from "./Poperror";
import { useNavigate } from 'react-router';
import InviteGame from "./InviteGame";

function Messages(props : any)
{
    if (!props.messages)
        return null;
    let index = -1;
    let a = props.messages.map((obj : any,i : number) =>
    {
        if (i > props.messages.length - props.amount)
        {
            index += 1;
            let me = (obj.senderId != props.myId);
            return <Box_message key={i} createdAt={obj.createdAt}
            name={props.type ? obj.senderName : props.name}
            reduis={me ? '20px 20px 20px 0px' : '20px 20px 0px'}
            alignSelf={me ? 'flex-start' : 'flex-end'} text={obj.message}
            id={obj.senderId}
            direction={me ? 'row' : 'row-reverse'} 
            side={me ? 'mr-auto' : 'ml-auto'}
            me={me}
            msgid={"msg-" + index}/>
        }
    }
    );
    return a;
}



const Chat_box = (props : any) => {
    const [amount,setAmount] = useState(100);
    const navigate = useNavigate();
    let avatar = "/api/v1/user/avatar?id=" + props.chatId;
    if (props.type)
        avatar = Avatar;
    let name : string = props.name;
    useEffect( () => {20
        let url;
        if (!props.type)
            url = `/api/v1/chat/dm?pairId=${props.chatId}`;
        else
            url = `/api/v1/chat/group/${props.chatId}/messages`;
        axios.get(url).then( (response) =>
        {
            props.setMessages(response.data);
        }
        )
    },[props.chatId]
    )
    const  handleScroll = (e : any) => {
        let element = e.target;
        if (element.scrollTop===0 && amount < props.messages.length) {
          setAmount(e => {return e * 2});
        }
     }
    useEffect( ()=>{
        if (!props.messages)
            return;
        let a
        if (amount > props.messages.length)
            a  = document.getElementById("msg-" + (props.messages.length - (amount / 2)));
        else
            a = document.getElementById("msg-" + (amount / 2))
        if (a)
            a.scrollIntoView();
     },[amount])
    useEffect ( ()=>
    {
        let a = document.getElementById("scroll");
        if (a)
            a.scrollIntoView();
    },[props.messages])

    const sendMsg = (event : any) => {
        event.preventDefault();
        let url;
        if (!props.type)
            url = `/api/v1/chat/message?receiverId=${props.chatId}`;
        else
            url = "/api/v1/chat/group/" + props.chatId + "/message";
        axios.post(url,{content: event.target.message.value}
        ).then(() => {
            event.target.message.value = "";
        }
        ).catch(error =>
        {
            const errorMessage = error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
        });
    }
    return (
        <div className='flex flex-col gap-2 bar-chat px-3 overflow-hidden w-full'>
            <div className="flex w-full">
                <div className="flex gap-2 p-4">
                    <button onClick={props.type ? undefined : (() => {navigate("/profile/" + props.chatId)})} className='icon-container iphone:w-7 iphone:h-7 tablet:w-10 tablet:h-10 '>
                        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                    </button>
                    <div className="flex flex-col gap-1">
                        <p className="text-msgColorOn text-[12px]">{name}</p>
                        <div className="flex gap-1">
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 ml-auto items-center">
                    {!props.type && <InviteGame id={props.chatId} className={"h-8 w-8"}/>}
                </div>
            </div>
            <div className="flex flex-col gap-1 overflow-auto h-[58vh] item-center " onScroll={ handleScroll}>
                {
                    <Messages id={props.chatId} myId={props.myId} type={props.type} messages={props.messages} name={name} amount={amount}/>    
                }
                <div id="scroll"></div>
            </div>
            <form className='flex rounded-xl bg-msgColorOn p-2 mb-2' onSubmit={sendMsg}>
                <input id="message" className="w-full text-[12px] placeholder-text-[12px] bg-transparent outline-none" title="text limit exceeded" pattern=".{1,1000}" type="text" required placeholder="Type your message..." />
                <button type="submit"><SendIcon /></button>
            </form>

        </div>
    );
}



export default Chat_box;