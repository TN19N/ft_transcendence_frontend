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
import { errorMsg } from "./Poperror";
import { useNavigate } from 'react-router';


export const socket = io(`${process.env.SERVER_HOST}/chat`);

export let myName;
export let myId;

axios.get("/api/v1/user/profile").then((response)=>
{
  myName = response.data.name;
  myId = response.data.id;
}).catch((error) => {})

const expand_box = (who) =>
{
  let names = ["inbox","chat_box","info"]
  let buttons = [];
  let boxs = [];
  let visible = 0;
  let current = 0;
  for (let i = 0;i < 3;i++)
  {
    buttons[i] = document.getElementById(names[i] + "_button");
    boxs[i] = document.getElementById(names[i]);
    if (getComputedStyle(boxs[i]).display == 'none')
      visible += 1;
    else
      current = i;
  }
  let before = [];
  let before_btn = [];
  let after = [];
  let after_btn = [];
  const iterate = (element,array) => 
  {
    element?.classList.forEach(
      function(value,index) {
        if (value.startsWith("max-t") || value.startsWith("max-i"))
        {
          array.push(value);
          element?.classList.remove(value);
        }
      }
    );
  }
  const add = (element,array) =>
  {
    for (let i = 0; i < array.length;i++)
      element?.classList.add(array);
  }
  if (visible == 1)
  {
    if (who == 2)
      current = 0;
    else
      current = 2;
  }
  iterate(boxs[who],before);
  iterate(buttons[who],before_btn);
  iterate(boxs[current],after);
  iterate(buttons[current],after_btn);
  add(boxs[who],after);
  add(buttons[who],after_btn);
  add(boxs[current],before);
  add(buttons[current],before_btn);
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
      var elements = document.querySelectorAll(".user" + status.userId);
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
          if (act.payload.name)
          {
            props.setName((name) => {
              if (chats[index].name == name)
                return act.payload.name;
              return name;
            })
            arr[index].name = act.payload.name;
          }
          if (act.payload.type)
            arr[index].type = act.payload.type;
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
      <div id="inbox" className='flex-1 block max-iphone:hidden max-h-[75vh] h-[75vh] max-w-fit'>
        <Inbox {...props} chats={chats}/>
      </div>
      <button onClick={() => {expand_box(0)}} id="inbox_button" className='bar-chat h-[78vh] max-h-[75vh] h-[75vh] hidden max-iphone:block  w-[10%]'>
        {"<>"}
      </button>
      <div id="chat_box" className='flex-[2] bar-chat max-h-[75vh] h-[75vh] block'>
        <Chat_box name={props.name} chatId={props.chatId} type={props.type} messages={messages} setMessages={setMessages}/>
      </div>
      <button onClick={() => {expand_box(1)}} id="chat_box_button" className='bar-chat max-h-[75vh] h-[75vh] hidden max-iphone:hidden w-[10%]'>
        {"<>"}
      </button>
    </>
  );
}

const Chat = () => {
    const [name,setName] = useState("");
    const [chatId, setChatId] = useState("");
    const [type,setType] = useState(0);
    const [myId,setMyId] = useState("");
    const [Gtype,setGtype] = useState("");
    useEffect(() =>
    {
      return () =>
      {
        socket.disconnect();
      }
    },[])
    return (
    <div className="flex flex-col gap-4 bg-[#01101F] ring ring-white ring-opacity-10 rounded-lg w-[90%]">
      <LogoBar />
      <section className='flex gap-1 w-[90%] mb-6 m-auto'>
        <Box setMyId={setMyId} setChatId={setChatId} chatId={chatId} setType={setType} type={type} setName={setName} name={name} setGtype={setGtype}/>
        <div id="info" className='flex-1 bar-chat block max-tablet:hidden min-w-[13%] max-h-[75vh] h-[75vh] w-fit max-w-[200px] overflow-y-auto overflow-x-hidden '>
          {type ? (
            <div id="scrollbar" className='flex flex-col gap-2 bar-chat overflow-x-hidden overflow-y-auto px-3 max-h-[75vh] h-[75vh]'>
            <Channels/>
            <GroupInfo myId={myId} chatId={chatId} type={Gtype}/>
            </div>
          ) : 
          (<FriendsOnline setChatId={setChatId} setName={setName}/>)}
        </div>
        <button onClick={() => {expand_box(2)}} id="info_button" className='flex bar-chat hidden max-tablet:block max-h-[75vh] h-[75vh] w-[10%]'>
          {"<>"}
        </button>
      </section>
    </div>
  );
}

export default Chat;