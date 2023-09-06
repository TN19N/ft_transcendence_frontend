import { SearchIcon } from "./Icons"
import Cards from "./Cards"
import { useState} from "react";
import Avatar from '../assets/playerIcon.svg';

const Inbox = (props : any) => {
    let list;
    const [search,setSearch] = useState("");
    if (props.chats)
    {
        list = props.chats.map((chat : any,index : number) => {
            if (!chat.name.toLowerCase().includes(search.toLowerCase()))
                return null;
            if (props.type)
                chat.avatar = Avatar;
            else
                chat.avatar = `/api/v1/user/avatar?id=${chat.id}`;
            return (
                        <div key={index}>
                <Cards {...chat} Itype={props.type} setGtype={props.setGtype} setChatId={props.setChatId} chosen={(chat.id == props.chatId)} setName={props.setName}/>
            </div>
        )
        }
        )
    }
    else
        list=null;
    
    return (
        <div className= 'flex flex-col gap-4 px-3 bg-InboxColor rounded-xl overflow-hidden max-h-[75vh] h-[75vh]'>
            <div className="flex justify-between">
                <button className={` w-full p-4 text-msgColorOff ${!props.type ? "active" : ""} text-center`} onClick={() => {props.setType(0);props.setChatId("");props.setChats(null)}}>Chat</button>
                <button className={`w-full p-4 text-msgColorOff ${props.type ? "active" : ""} text-center `} onClick={() => {props.setType(1);props.setChatId("");props.setChats(null)}}>Channel</button>
            </div>
            <div className="flex items-center gap-4  bg-background py-3 rounded-full px-4 ">
                <input className="w-full  text-msgColorOff bg-transparent outline-none placeholder:text-msgColorOff text-[12px]" type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                <SearchIcon className="fill-BordeButtomColor w-4 h-4" />
            </div>
            <div className="flex flex-col h-fit gap-0 overflow-auto item-center h-[67vh]">
                {
                    list
                }
            </div>
        </div>
    );
}

export default Inbox;