// @ts-nocheck
import './icon.css';
import { DeleteIcon, LeaveIcon, OnlineIcon } from "./Icons"
import { useEffect,useState} from "react";
import './GroupInfo.css';
import axios from "axios"
import Ikick from '../assets/kick.png'
import Imoderate from '../assets/admin.png'
import Iunmoderate from '../assets/member.png'
import Iowner from '../assets/owner.png'
import Imute from '../assets/mute.png'
import Iunmute from '../assets/unmute.png'
import Ic_owner from '../assets/current_owner.png'
import Iadd from '../assets/add.png'
import Avatar from '../assets/playerIcon.svg';
import { ManageIcon} from './Icons';
import Popup from 'reactjs-popup';
import {socket} from './Chat'
const roles = ["MEMBER_MUTED","MEMBER","ADMIN","OWNER"];
const actions = ["","","",""]
import Manage from './Manage';
import {myId} from './Chat';

function Actions(props)
{
    const action = (name) =>
    {
        let query = name[0].toUpperCase() + name.slice(1); 
        if (name == "upgrade" || name == "downgrade")
            name += "Member";
        if (name == "transfer")
            name += "Ownership"
        axios.patch(`/api/v1/chat/group/${props.gid}/${name}?userTo${query}Id=${props.id}`)
    }
    let own = (props.my_role == "OWNER");
    let higher = (roles.indexOf(props.my_role) > roles.indexOf(props.member_role));
    let muted = (props.member_role == "MEMBER_MUTED");
    let mod = (props.member_role == "ADMIN");
        
    if (!higher || props.my_role == "MEMBER" || props.my_role == "MEMBER_MUTED")
        return (null);
    return (<>
        <button onClick={() => {action(muted ? "unMute" : "mute")}} title={muted ? "unMute" : "mute"}><img id="icon" className="w-4 h-4 rounded-full" src={muted ? Iunmute : Imute}/></button>
        <button onClick={() => {action("ban")}} title="ban"><img id="icon" className="w-4 h-4" src={Ikick}/></button>
        {own ? (<button onClick={() => {action(mod ? "downgrade" : "upgrade")}} title={mod ? "unmod" : "mod"}><img id="icon" className="w-4 h-4 rounded-full" src={mod ? Iunmoderate : Imoderate}/></button>) : null}
        {own ? (<button onClick={() => {action("transfer")}} title="GiveOwnership"><img id="icon" className="w-4 h-4 rounded-full" src={Iowner}/></button>) : null}
    </>)
}

const invite=(gid,uid,canInvite,setCanInvite,index,blocked) => {
    if (blocked)
    {
        axios.put(`/api/v1/chat/group/${gid}/unBanAndInvite?userId=${uid}`).then((response) =>
        {
            let arr = [...canInvite];
            arr[index].isInvited = 1;
            setCanInvite(arr);
        })
        return;
    }
    axios.post(`/api/v1/chat/group/${gid}/invite?userToInviteId=${uid}`).then((response) =>
    {
        let arr = [...canInvite];
        arr[index].isInvited = 1;
        setCanInvite(arr);
    })
}
const uninvite=(gid,uid,canInvite,setCanInvite,index) => {
    axios.delete(`/api/v1/chat/group/${gid}/invite?reciverId=${uid}`).then((response) =>
    {
        let arr = [...canInvite];
        arr[index].isInvited = 0;
        setCanInvite(arr);
    })
}




function GroupInfo(props) {
    console.log(props.chatId);
    if (!props.chatId)
        return null
    const [members,setMembers] = useState(null);
    const [canInvite,setCanInvite] = useState(null);
    const [clicked,setClick] = useState(0);
    useEffect(() =>
    {
        axios.get(`/api/v1/chat/group/${props.chatId}/members`).then((response) =>
        {
            console.log(response.data);
            response.data.sort((a,b) => {return (roles.indexOf(b.role) - roles.indexOf(a.role))});
            console.log(response.data);
            setMembers(response.data);
        })
    },[props.chatId])
    useEffect(() =>
    {
        if (!clicked)
            return;
        axios.get(`/api/v1/chat/group/${props.chatId}/friendsToJoin`).then((response) =>
        {
            setCanInvite(response.data);
        })
    },[clicked])
    useEffect(()=>
    {
        const change = (obj) =>
        {
            console.log(obj);
            if (props.chatId != obj.payload.groupId)
                return;
            setMembers((m) => {
                let arr = [...m];

                let index = m.findIndex((memb) => 
                {
                    return (memb.id == obj.payload.userId);
                })
                console.log(obj);
                if (obj.actionType == 'USER_JOINED' && index == -1)
                    arr = [...arr,{name:obj.payload.name,id:obj.payload.userId,role:"MEMBER"}];
                else if (obj.actionType == 'OWNERSHIP_TRANSFERMED')
                {
                    index = m.findIndex((memb) => 
                    {
                        return (memb.id == obj.payload.from);
                    })
                    if (index != -1)
                        arr[index].role = "MEMBER";
                    index = m.findIndex((memb) => 
                    {
                        return (memb.id == obj.payload.to);
                    })
                    if (index != -1)
                        arr[index].role = "OWNER";
                }
                else if (index == -1 && obj.actionType != 'USER_JOINED')
                    return m;
                else if (obj.actionType == 'USER_BANNED')
                    arr.splice(index,1);
                else if (obj.actionType == 'USER_MUTED')
                    arr[index].role = "MEMBER_MUTED";
                else if (obj.actionType == 'USER_UNMUTED')
                    arr[index].role = "MEMBER";
                else if (obj.actionType == 'USER_UPGRADED')
                    arr[index].role = "ADMIN"
                if (obj.actionType == 'USER_DOWNGRADED')
                    arr[index].role = "MEMBER"
                if (obj.actionType == 'USER_LEAVED' && arr[index].id != myId)
                    arr.splice(index,1);
                arr.sort((a,b) => {return (roles.indexOf(b.role) - roles.indexOf(a.role))});
                return (arr);
            });
        }
        socket.off('action',change);
        socket.on('action',change);
        return () => {
          socket.off('action',change);
        }
    },[])
    
    if (!members)
        return null
    let myIndex = members.findIndex((obj) => {return (obj.id == myId)});
    if (myIndex == -1)
        return;
    let invite_perm = (members[myIndex].role == "OWNER" || members[myIndex].role == "ADMIN");
    return (<>
        <Manage chatId={props.chatId} type={props.type} role={members[myIndex].role}/>
        <div className="flex justify-between py-2 align-center">
            <h3 className="text-white m-auto text-xl">Members</h3>
            {invite_perm && <button id={clicked ? "add_icon_click" : "add_icon"} className="h-8 w-8 flex item-center m-auto" onClick={() => {setClick(clicked == 0)}}><img src={Iadd}/></button>}
        </div>
    <div id="parent">
        {!clicked ?
        (
        <div className={"overflow-x-hidden flex flex-col flex-1 gap-2 overflow-auto item-center"} style={{ maxHeight: '80vh' }}>
            {members.map((obj,index) => {
                let status;
                if (obj.status == "OFFLINE")
                    status = "bg-[black]";
                else if (obj.status == "ONLINE")
                    status = "bg-[green]";
                else
                    status = "bg-[red]";
                let icon = Ic_owner;
                if (obj.role != "OWNER")
                    icon = (obj.role == "ADMIN") ? Imoderate : Iunmoderate;
                return (<div key={index} className="flex flex-col rounded-lg hover:bg-blue-900 p-1">
                    <div className="flex flex-col align-center rounded-lg">
                        <div className="flex gap-3 px-3">
                            <div className='icon-container m-auto'>
                                <img src={"/api/v1/user/avatar?id=" + obj.id} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div className={obj.id + " status-circle " + status}></div>
                            </div>
                            <div className="flex flex-col flex-3 gap-2 m-auto justify-center items-center">
                                <p className="text-msgColorOn text-[0.75rem] whitespace-nowrap">{obj.name}</p>
                                <div className="flex flex-row gap-[0.3rem]">
                                    <Actions index={index} my_role={members[myIndex].role} member_role={obj.role} id={obj.id} gid={props.chatId} members={members} setMembers={setMembers}/>
                                </div>
                            </div>
                            <img src={icon} className="w-5 h-5 m-auto" />
                        </div>
                    </div>
                </div>)
            })
            }
        </div>
        )
        :
        (<div className={"overflow-x-hidden flex flex-col flex-1 gap-2 overflow-auto item-center"} style={{ maxHeight: '80vh' }} >
            {canInvite ? (canInvite.map((obj,index) => {
            return (<div key={index} className="flex flex-col rounded-lg hover:bg-blue-900 p-1">
                <div className="flex flex-col rounded-lg">
                    <div className="flex gap-1 px-3">
                        <div class='icon-container '>
                            <img src={"/api/v1/user/avatar?id=" + obj.id} alt="avatar" className="w-10 h-10 rounded-full" />
                        </div>
                        <div className="flex flex-1 flex-col">
                            <p className="text-msgColorOn text-[0.75rem] whitespace-nowrap">{obj.name}</p>
                        </div>
                        <div className="flex flex-1 flex-row gap-1 items-center justify-end">
                        <button className="text-[1.3rem] text-white" onClick={() => {obj.isInvited ? uninvite(props.chatId,obj.id,canInvite,setCanInvite,index) : invite(props.chatId,obj.id,canInvite,setCanInvite,index,obj.isBlocked)}}>{obj.isInvited ? '×' : '+'}</button>
                        </div>
                    </div>
                </div>
            </div>)
            })) : 
            (
                null
            )
            }
        </div>)
        }
    </div> 
</>);
}

export default GroupInfo;