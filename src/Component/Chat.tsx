// @ts-nocheck
import LogoBar from './LogoBar'
import Inbox from './Inbox'
import Chat_box from './Chat_box'
import FriendsOnline from './FriendsOnline'
import GroupInfo from './GroupInfo'
import { useEffect,useState} from "react";
import axios from "axios"
import Avatar from '../assets/playerIcon.svg';
import './GroupInfo.css';
import Iadd from '../assets/add.png'
import { io } from 'socket.io-client';


export const socket = io("${process.env.SERVER_HOST}/chat");

export let myName;
export let myId;

axios.get("/api/v1/user/profile").then((response)=>
{
  console.log(response.data);
  myName = response.data.name;
  myId = response.data.id;
})

const join_group = (e,info,channels,setChannels,index) =>
{
    let obj = {};
    let doc = document.getElementById(info.id);
    if (info.type == "PROTECTED")
      obj.password = doc.value;
    axios.post(`/api/v1/chat/group/${info.id}/join`,obj).then(() =>
    {
        let arr = [...channels];
        arr.splice(index,1);
        setChannels(arr);
    }).catch((err) => {
      if (info.type == "PROTECTED")
        doc.style.border = "2px solid red";
    });
}
function Channels()
{
    const [expand,setExpand] = useState(0);
    const [channels,setChannels] = useState(null);
    const [create,setCreate] = useState(0);

    useEffect(() =>
    {
        axios.get("/api/v1/chat/group/search").then((response) =>
        {
            setChannels(response.data);
        })
    },[])
    let type = "PUBLIC";
    const create_channel = (event) => {
        event.preventDefault();
        console.log(event.target[1].disabled);
        let obj = {name: event.target[0].value,type: type};
        if (type=="PROTECTED")
            obj.password = event.target[1].value;
        axios.post("/api/v1/chat/group/create",obj).then(res => {
            document.getElementById("error_msg").innerHTML = "";
        }).catch(err => {
            document.getElementById("error_msg").innerHTML = err.response.data.message;
        })
    }
    const setType = (event) =>
    {
        let doc = document.getElementById("password_prompt");
        type = event.target.value;
        if (type == "PROTECTED")
        {
            doc.disabled = false;
            doc.style.visibility = "visible";
        }
        else
        {   
            doc.disabled = true;
            doc.style.visibility = "hidden";
        }
    }
    if (!channels)
        return (null);
    return (<>
    <div className="flex flex-col justify-center">
        <div className="flex justify-between pt-4 align-center">
            <h3 className="text-white m-auto text-xl">Channels</h3>
            <button id={create ? "add_icon_click" : "add_icon"} className="h-8 w-8 flex item-center m-auto" onClick={() => {setCreate(create == 0)}}><img src={Iadd}/></button>
        </div>
        <div id={expand ? "expand" : "shrink"} className="pt-3 flex flex-col">
            {(!create) ? (channels.map((obj,index) =>
            {
                return (<div className="hover:bg-blue-900 rounded-lg flex gap-2 px-3">
                    <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <p className="text-msgColorOn text-[12px]">{obj.name}</p>
                            {(obj.type == "PROTECTED") ? (<div className="text-[8px]" >🔒</div>) : (null)}
                        </div>
                        {(obj.type == "PROTECTED") ? (<input type="password" className="pass_input" id={obj.id}/>) : null}
                    </div>
                    <button onClick={(e) => {join_group(e,obj,channels,setChannels,index)}} value={obj.type} className="ml-auto text-white text-[1.3rem]">+</button>
                </div>)
            }))
            :
            (<form onSubmit={create_channel} className="form flex flex-col m-auto overflow-hidden gap-5 w-[10rem]">
                <input className="input" type="text" placeholder="name" required="required"/>
                <input className="input" disabled id="password_prompt" pattern=".{6,}" required="required" title="Must contain at least 6 characters" type="password" placeholder="password"/>
                <div className="flex flex-col relative">
                    <div><input onClick={setType} className="radio-item" type="radio" name="Gtype" id="PUBLIC" value="PUBLIC" defaultChecked="checked" /> <label className="text-white" for="PUBLIC">PUBLIC</label></div>
                    <div><input onClick={setType} className="radio-item" type="radio" name="Gtype" id="PROTECTED" value="PROTECTED"/> <label className="text-white" for="PROTECTED">PROTECTED</label></div>
                    <div><input onClick={setType} className="radio-item" type="radio" name="Gtype" id="PRIVATE" value="PRIVATE"/> <label className="text-white" for="PRIVATE">PRIVATE</label></div>
                </div>
                <div id="error_msg" className="text-center text-red-800 text-sm"></div>
                <input type="submit" className="text-white m-auto mb-4 w-[50%] rounded-lg bg-blue-500 hover:bg-blue-700 active:scale-90" value="Create"/>
            </form>)}
        </div>
        <button onClick={() => {setExpand(expand ^ 1)}} className="border-b-2 border-white ml-auto mr-auto text-center text-white w-[90%]">{expand ? '▲' : '▼'}</button>
    </div>

    </>
)
}


function Box(props)
{
  const [chats,setChats] = useState(null);
  const [messages,setMessages] = useState(null);
  useEffect( () => {
    let url;
    if (!props.type)
      url = "/api/v1/chat/dms";
    else
      url = "/api/v1/chat/group/joined";
    axios.get(url).then( (response) =>
    {
      if (props.type && response.data.length)
        props.setMyId(response.data[0].myId);
      props.setChatId("");
      setChats(response.data);
    }
    )
},[props.type]
)
  useEffect(() => {
    const recieve = (s_msg) =>
    {
      console.log(s_msg);
      let chatId;
      let type = props.type;
      props.setChatId((chat) => { chatId = chat; return chat; })
      props.setType((t) => { type = t ; return t;})
      if ((s_msg.type == "group" && !type) || (s_msg.type == "dm" && type))
        return;
      if (s_msg.type == "group")
      {
        s_msg.id = s_msg.payload.groupId;
        s_msg.name = s_msg.payload.groupName;
      }
      else
      {
        let who = (s_msg.payload.senderName == myName) ? "receiver" : "sender"
        s_msg.id = s_msg.payload[who + "Id"];
        s_msg.name = s_msg.payload[who + "Name"];
      }
      if (s_msg.id == chatId)
      {
        setMessages((prev) => 
        {
          let message =   {
              id: "",
              createdAt: "",
              senderId: s_msg.payload.senderId,
              receiverId: "",
              message: s_msg.payload.message
            }
          if (!prev)
            return (null);
          return [...prev,message];
        })
      }
      setChats((chats) =>
      {
        if (!chats)
          return null;
        let arr = chats.filter((e) => {
          return (e.id != s_msg.id);
        })
        let obj = {createAt: "",id:s_msg.id ,name: s_msg.name, message: s_msg.payload.message}
        return ([obj,...arr]);
      })
    }
    socket.on('message',recieve);
    return () => {
      socket.off('message',recieve);
    }
}, []);
  return (
    <>
      <div className='flex-1 max-w-fit'>
        <Inbox {...props} chats={chats}/>
      </div>
      <div className='flex-[2] bar-chat h-[78vh] iphone:hidden tablet:block'>
        <Chat_box name={props.name} chatId={props.chatId} type={props.type} messages={messages} setMessages={setMessages}/>
      </div>
    </>
  );
}

const Chat = () => {
    const [name,setName] = useState("");
    const [chatId, setChatId] = useState("");
    const [type,setType] = useState(1);
    const [myId,setMyId] = useState("");
    console.log(type);
    return (
    <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg w-[90%]">
      <LogoBar />
      <section className='flex gap-1 w-[90%] mb-6 m-auto'>
        <Box setMyId={setMyId} setChatId={setChatId} chatId={chatId} setType={setType} type={type} setName={setName} name={name}/>
        <div className='flex-1 bar-chat iphone:hidden max-w-fit laptop:block overflow-y-auto overflow-x-hidden '>
          {type ? (
            <div id="scrollbar" className='flex flex-col gap-2 bar-chat max-w-fit overflow-x-hidden overflow-y-auto px-3 max-h-[71vh]'>
            <Channels/>
            <GroupInfo myId={myId} chatId={chatId}/>
            </div>
          ) : 
          (<FriendsOnline setChatId={setChatId} setName={setName}/>)}
        </div>
      </section>
    </div>
  );
}

export default Chat;
