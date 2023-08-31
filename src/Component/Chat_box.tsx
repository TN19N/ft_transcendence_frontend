// @ts-nocheck
import { OnlineIcon, PlayIcon, BlockIcon, SendIcon ,LeaveIcon} from './Icons';
import Box_message from './BoxMsg';
import { useEffect,useState} from "react";
import axios from 'axios';
import { flushSync } from 'react-dom';
import Avatar from '../assets/playerIcon.svg';
import {socket} from './Chat'
import { myId } from './Chat';

function Messages(props)
{
    if (!props.messages)
        return null;
    let a = props.messages.map((obj,i) =>
    {
        let me = (obj.senderId != myId);
        return <Box_message key={i} 
        name={props.type ? obj.senderName : props.name}
        reduis={me ? '20px 20px 20px 0px' : '20px 20px 0px'}
        alignSelf={me ? 'flex-start' : 'flex-end'} text={obj.message}
        id={obj.senderId}
        direction={me ? 'row' : 'row-reverse'} 
        side={me ? 'mr-auto' : 'ml-auto'}
        me={me}/>
    }
    );
    return a;
}



const Chat_box = (props) => {
    if (props.chatId == "")
        return null;
    let avatar = "/api/v1/user/avatar?id=" + props.chatId;
    if (props.type)
        avatar = Avatar;
    let name = props.name;
    useEffect( () => {
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

    useEffect ( ()=>
    {
        let a = document.getElementById("scroll");
        a.scrollIntoView();
    },[props.messages])

    const sendMsg = (event) => {
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
        );
    }
    const leave = (event) => {
        axios.patch(`/api/v1/chat/group/${props.chatId}/leave`);
    }
    return (
        <div className='flex flex-col gap-2 bar-chat px-3 overflow-hidden w-full'>
            <div className="flex w-full">
                <div className="flex gap-2 p-4">
                    <img src={avatar} alt="avatar" className="iphone:w-7 iphone:h-7 tablet:w-10 tablet:h-10 rounded-full" />
                    <div className="flex flex-col gap-1">
                        <p className="text-msgColorOn text-[12px]">{name}</p>
                        <div className="flex gap-1">
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 ml-auto items-center">
                    {!props.type ? (<><button className='bg-buttonPlaybgColor p-2 rounded-[50%]'><PlayIcon className="w-6 h-6" /></button>
                    <button className='bg-buttonPlaybgColor p-2 rounded-[50%]'><BlockIcon className="w-6 h-6" /></button></>)
                    :
                    (<button onClick={leave} className='bg-buttonPlaybgColor p-2 rounded-[50%]'><LeaveIcon className="w-6 h-6"/></button>)
                }
                </div>
            </div>
            <div className="flex flex-col gap-1 overflow-auto h-[67vh] item-center ">
                {
                    <Messages id={props.chatId} type={props.type} messages={props.messages} name={name}/>    
                }
                <div id="scroll"></div>
            </div>
            <form className='flex rounded-xl bg-msgColorOn p-2 mb-2' onSubmit={sendMsg}>
                <input id="message" className="w-full text-[12px] placeholder-text-[12px] bg-transparent outline-none" type="text" placeholder="Type your message..." />
                <label htmlFor="submit">
                    <SendIcon />
                </label>
            </form>

        </div>
    );
}



export default Chat_box;