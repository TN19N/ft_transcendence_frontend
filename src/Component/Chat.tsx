// @ts-nocheck
import LogoBar from './LogoBar'
import Inbox from './Inbox'
import Chat_box from './Chat_box'
import FriendsOnline from './FriendsOnline'
import Channels from './Channels'
import GroupInfo from './GroupInfo'
import { useEffect,useState} from "react";
import axios from "axios"
import Avatar from '../assets/playerIcon.svg';
import './GroupInfo.css';
import Iadd from '../assets/add.png'
import { io } from 'socket.io-client';


export const socket = io(`${process.env.SERVER_HOST}/chat`);

export let myName;
export let myId;

axios.get("/api/v1/user/profile").then((response)=>
{
  myName = response.data.name;
  myId = response.data.id;
})


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
      {
        props.setMyId(response.data[0].myId);
      }
      props.setChatId("");
      setChats(response.data);
    }
    )
  },[props.type]
  )
  useEffect (() =>
  {
    const change_status = (status) => 
    {
      console.log(status);
      var elements = document.querySelectorAll("." + status.userId);
      for (var i = 0; i < elements.length; i++) {
          if (status.status == "ONLINE")
            elements[i].style.backgroundColor = "green";
          else if (status.status == "OFFLINE")
            elements[i].style.backgroundColor = "black";
          else
            elements[i].style.backgroundColor = "red";
      }
    }
    socket.on('status',change_status);
    return () => {
      socket.off('status',change_status);
    }
  },[])
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

    const action = (act) =>
    {
      setChats((chats) =>
      {
        let index = chats.findIndex((chat) =>
        {
          return (chat.id == act.payload.groupId);
        })
        console.log(myId,act)
        if (act.actionType == "GROUP_CREATED" && myId == act.payload.ownerId && index == -1)
          return ([{name:act.payload.name,type:act.payload.type,ownerId:act.payload.ownerId,myId:myId,id:act.payload.groupId},...chats])
        else if (act.actionType == "USER_JOINED" && myId == act.payload.userId && index == -1)
          return ([{name:act.payload.groupName,type:act.payload.type,ownerId:"",id:act.payload.groupId,myId:myId},...chats])
        if (index == -1)
          return chats;

        let arr = [...chats];
        if (act.actionType == "GROUP_DELETED" || ((act.actionType == "USER_LEAVED" || act.actionType == "USER_BANNED") && myId == act.payload.userId))
        {
          arr.splice(index,1);
          props.setChatId((Id) => {
            if (act.payload.groupId == Id)
              return "";
            else
              return Id;
          })
        }
        else if (act.actionType == "GROUP_UPDATED")
        {
          props.setName((name) => {
            if (chats[index].name == name)
              return act.payload.name;
            return name;
          })
          arr[index].name = act.payload.name;
          arr[index].id = act.payload.groupId;
        }
        return arr;
      })
    }
    socket.on('message',recieve);
    socket.on('action',action);
    return () => {
      socket.off('message',recieve);
      socket.off('action',action);
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
    const [type,setType] = useState(0);
    const [myId,setMyId] = useState("");
    const [Gtype,setGtype] = useState("");
    console.log(type);
    return (
    <div className="flex flex-col gap-4 bg-[#01101F] ring ring-white ring-opacity-10 rounded-lg w-[90%]">
      <LogoBar />
      <section className='flex gap-1 w-[90%] mb-6 m-auto'>
        <Box setMyId={setMyId} setChatId={setChatId} chatId={chatId} setType={setType} type={type} setName={setName} name={name} setGtype={setGtype}/>
        <div className='flex-1 bar-chat iphone:hidden min-w-[13%] max-w-fit laptop:block overflow-y-auto overflow-x-hidden '>
          {type ? (
            <div id="scrollbar" className='flex flex-col gap-2 bar-chat overflow-x-hidden overflow-y-auto px-3 max-h-[71vh]'>
            <Channels/>
            <GroupInfo myId={myId} chatId={chatId} type={Gtype}/>
            </div>
          ) : 
          (<FriendsOnline setChatId={setChatId} setName={setName}/>)}
        </div>
      </section>
    </div>
  );
}

export default Chat;