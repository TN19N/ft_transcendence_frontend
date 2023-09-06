import LogoBar from './LogoBar'
import Inbox from './Inbox'
import Chat_box from './Chat_box'
import FriendsOnline from './FriendsOnline'
import Channels from './Channels'
import GroupInfo from './GroupInfo'
import { useEffect,useState, useRef} from "react";
import axios from "axios"
import './GroupInfo.css';
import { io } from 'socket.io-client';

const expand_box = (who : any) =>
{
  let names : string[] = ["inbox","chat_box","info"]
  let buttons : any[] = [];
  let boxs : any[] = [];
  let visible : number = 0;
  let current : number = 0;
  for (let i = 0;i < 3;i++)
  {
    buttons[i] = document.getElementById(names[i] + "_button");
    boxs[i] = document.getElementById(names[i]);
    if (getComputedStyle(boxs[i]).display == 'none')
      visible += 1;
    else
      current = i;
  }
  let before : string[] = [];
  let before_btn : string[] = [];
  let after : string[] = [];
  let after_btn : string[] = [];
  const iterate = (element : any,array : string[]) => 
  {
    element?.classList.forEach(
      function(value : string) {
        if (value.startsWith("max-t") || value.startsWith("max-i"))
        {
          array.push(value);
          element?.classList.remove(value);
        }
      }
    );
  }
  const add = (element : any,array : string[]) =>
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

function Box(props : any)
{
  const [chats,setChats] = useState<any[] | null | undefined>(null);
  const [messages,setMessages] = useState<any[] | null>(null);
  useEffect( () => {
    let url;
    props.typeRef.current = props.type;
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
  useEffect(() => {
    if (!props.socket)
      return;
    const change_status = (status : any) => 
    {
      var elements : any = document.querySelectorAll(".user" + status.userId);
      for (var i = 0; i < elements.length; i++) {
          if (status.status == "ONLINE")
            elements[i].style.backgroundColor = "green";
          else if (status.status == "OFFLINE")
            elements[i].style.backgroundColor = "black";
          else
            elements[i].style.backgroundColor = "red";
      }
    }
    const recieve = (s_msg : any) =>
    {
      let chatId;
      let type = props.type;
      props.setChatId((chat : any) => { chatId = chat; return chat; })
      props.setType((t : any) => { type = t ; return t;})
      if ((s_msg.type == "group" && !type) || (s_msg.type == "dm" && type))
        return;
      if (s_msg.type == "group")
      {
        s_msg.id = s_msg.payload.groupId;
        s_msg.name = s_msg.payload.groupName;
      }
      else
      {
        let who = (s_msg.payload.senderName == props.myName.current) ? "receiver" : "sender"
        s_msg.id = s_msg.payload[who + "Id"];
        s_msg.name = s_msg.payload[who + "Name"];
      }
      if (s_msg.id == chatId)
      {
        setMessages((prev) => 
        {
          let message =   {
              id: "",
              createdAt: s_msg.payload.createdAt,
              senderId: s_msg.payload.senderId,
              receiverId: "",
              senderName: s_msg.payload.senderName,
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

    const action = (act : any) =>
    {
      setChats((chats) =>
      {
        if (!chats || !props.typeRef.current )
          return chats;
        let index = chats.findIndex((chat) =>
        {
          return (chat.id == act.payload.groupId);
        })
        if (act.actionType == "GROUP_CREATED" && props.myId.current == act.payload.ownerId && index == -1)
          return ([{name:act.payload.name,type:act.payload.type,ownerId:act.payload.ownerId,myId:props.myId.current,id:act.payload.groupId},...chats])
        else if (act.actionType == "USER_JOINED" && props.myId.current == act.payload.userId && index == -1)
          return ([{name:act.payload.groupName,type:act.payload.type,ownerId:"",id:act.payload.groupId,myId:props.myId.current},...chats])
        if (index == -1)
          return chats;
        let arr = [...chats];
        if (act.actionType == "GROUP_DELETED" || ((act.actionType == "USER_LEAVED" || act.actionType == "USER_BANNED") && props.myId.current == act.payload.userId))
        {
          arr.splice(index,1);
        }
        else if (act.actionType == "GROUP_UPDATED")
        {
          if (act.payload.name)
          {
            props.setName((name : string) => {
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
      if (act.actionType == "GROUP_DELETED" || ((act.actionType == "USER_LEAVED" || act.actionType == "USER_BANNED") && props.myId.current == act.payload.userId))
      {
        props.setChatId((Id : string) => {
          if (act.payload.groupId == Id)
            return "";
          else
            return Id;
        })
      }
    }
    props.socket.on('message',recieve);
    props.socket.on('action',action);
    props.socket.on('status',change_status);
    return () => {
      props.socket.off('message',recieve);
      props.socket.off('action',action);
      props.socket.off('status',change_status);
    }
}, [props.socket]);
  return (
    <>
      <div id="inbox" className='flex-1 block max-iphone-chat:hidden max-h-[75vh] h-[75vh] max-w-fit'>
        <Inbox {...props} setChats={setChats} chats={chats}/>socket
      </div>
      <button onClick={() => {expand_box(0)}} id="inbox_button" className='bar-chat h-[78vh] max-h-[75vh] h-[75vh] hidden max-iphone-chat:block  w-[10%]'>
        {"<>"}
      </button>
      <div id="chat_box" className='flex-[2] bar-chat max-h-[75vh] h-[75vh] block'>
        {(props.chatId != "") && <Chat_box myName={props.myName.current} myId={props.myId.current} name={props.name} chatId={props.chatId} type={props.type} messages={messages} setMessages={setMessages}/>}
      </div>
      <button onClick={() => {expand_box(1)}} id="chat_box_button" className='bar-chat max-h-[75vh] h-[75vh] hidden max-iphone-chat:hidden w-[10%]'>
        {"<>"}
      </button>
    </>
  );
}

const Chat = () => {
    const [name,setName] = useState<string>("");
    const [chatId, setChatId] = useState<string>("");
    const [type,setType] = useState<number>(0);
    const [myId,setMyId] = useState<string>("");
    const [myName,setMyName] = useState<string>("");
    const myIdRef = useRef(myId);
    const myNameRef = useRef(myName);
    const [Gtype,setGtype] = useState<string>("");
    const [socket,setSocket] = useState<any | null>(null);
    const socketRef = useRef(socket);
    const typeRef = useRef(type);
    const chatIdRef = useRef(chatId);
    useEffect(() =>
    {
      socketRef.current = io(`${process.env.SERVER_HOST}/chat`);
      setSocket(socketRef.current);
      axios.get("/api/v1/user/profile").then((response)=>
      {
        setMyName(response.data.name);
        myNameRef.current = response.data.name;
        myIdRef.current = response.data.id;
        setMyId(response.data.id);
      }).catch(() => {})

      return () =>
      {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
    },[])
    useEffect(() =>
    {
      chatIdRef.current = chatId;
    },[chatId])
    return (
    <div className="flex flex-col gap-4 bg-[#01101F] ring ring-white ring-opacity-10 rounded-lg w-[90%]">
      <LogoBar />
      <section className='flex gap-1 w-[90%] mb-6 m-auto'>
        <Box socket={socket} typeRef={typeRef} myId={myIdRef} myName={myNameRef} setChatId={setChatId} chatId={chatId} setType={setType} type={type} setName={setName} name={name} setGtype={setGtype}/>
        <div id="info" className='flex-1 bar-chat block max-tablet-chat:hidden min-w-[13%] max-h-[75vh] h-[75vh] w-fit max-w-[200px] overflow-y-auto overflow-x-hidden '>
          {type ? (
            <>
              <div id="scrollbar" className='flex flex-col gap-2 bar-chat overflow-x-hidden overflow-y-auto px-3 max-h-[75vh] h-[75vh]'>
              <Channels/>
              {(chatId != "") && <GroupInfo chatIdRef={chatIdRef} socket={socket} myId={myIdRef} myName={myNameRef} chatId={chatId} type={Gtype}/>}
              </div>
            </>
          ) : 
          (<FriendsOnline setChatId={setChatId} setName={setName}/>)}
        </div>
        <button onClick={() => {expand_box(2)}} id="info_button" className='flex bar-chat hidden max-tablet-chat:block max-h-[75vh] h-[75vh] w-[10%]'>
          {"<>"}
        </button>
      </section>
    </div>
  );
}

export default Chat;