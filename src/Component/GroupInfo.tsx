
import './icon.css';
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
const roles = ["MEMBER_MUTED","MEMBER","ADMIN","OWNER"];
import Manage from './Manage';
import { errorMsg } from "./Poperror";
import { useNavigate } from 'react-router';

function Actions(props : any)
{
    const action = (name : string) =>
    {
        let query = name[0].toUpperCase() + name.slice(1); 
        if (name == "upgrade" || name == "downgrade")
            name += "Member";
        if (name == "transfer")
            name += "Ownership"
        axios.patch(`/api/v1/chat/group/${props.gid}/${name}?userTo${query}Id=${props.id}`).then(() => {}).catch(error =>
        {
            const errorMessage = error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
        });
    }
    let own = (props.my_role == "OWNER");
    
    let higher = (roles.indexOf(props.my_role) > roles.indexOf(props.member_role));
    let can_mod = (props.my_role == "ADMIN") && higher;
    let muted = (props.member_role == "MEMBER_MUTED");
    let mod = (props.member_role == "ADMIN");
        
    if (!higher || props.my_role == "MEMBER" || props.my_role == "MEMBER_MUTED")
        return (null);
    return (<>
        <button onClick={() => {action(muted ? "unMute" : "mute")}} title={muted ? "unMute" : "mute"}><img id="icon" className="w-4 h-4 rounded-full" src={muted ? Iunmute : Imute}/></button>
        <button onClick={() => {action("ban")}} title="ban"><img id="icon" className="w-4 h-4" src={Ikick}/></button>
        {own ? (<button onClick={() => {action(mod ? "downgrade" : "upgrade")}} title={mod ? "unmod" : "mod"}><img id="icon" className="w-4 h-4 rounded-full" src={mod ? Iunmoderate : Imoderate}/></button>) : null}
        {can_mod ? (<button onClick={() => {action("upgrade")}} title={"mod"}><img id="icon" className="w-4 h-4 rounded-full" src={Imoderate}/></button>) : null}
        {own ? (<button onClick={() => {action("transfer")}} title="GiveOwnership"><img id="icon" className="w-4 h-4 rounded-full" src={Iowner}/></button>) : null}
    </>)
}

const invite=(gid : string,uid : string,canInvite : any[],setCanInvite : any,index : number,blocked : number) => {
    if (blocked)
    {
        axios.put(`/api/v1/chat/group/${gid}/unBanAndInvite?userId=${uid}`).then(() =>
        {
            let arr = [...canInvite];
            arr[index].isInvited = 1;
            setCanInvite(arr);
        }).catch(error =>
        {
            const errorMessage = error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
        });
        return;
    }
    axios.post(`/api/v1/chat/group/${gid}/invite?userToInviteId=${uid}`).then(() =>
    {
        let arr = [...canInvite];
        arr[index].isInvited = 1;
        setCanInvite(arr);
    }).catch(error =>
    {
        const errorMessage = error.response?.data?.message || "An error occurred";
        errorMsg(errorMessage);
    });
}
const uninvite=(gid : string,uid : string,canInvite : any[],setCanInvite : any,index : number) => {
    axios.delete(`/api/v1/chat/group/${gid}/invite?reciverId=${uid}`).then(() =>
    {
        let arr = [...canInvite];
        arr[index].isInvited = 0;
        setCanInvite(arr);
    }).catch(error =>
    {
        const errorMessage = error.response?.data?.message || "An error occurred";
        errorMsg(errorMessage);
    });
}




function GroupInfo(props : any) {
    if (!props.chatId)
        return null
    const [members,setMembers] = useState<any[] | null | undefined>(null);
    const [canInvite,setCanInvite] = useState<any[] | null | undefined>(null);
    const [clicked,setClick] = useState<boolean | number>(0);
    let navigate = useNavigate();
    useEffect(() =>
    {
        axios.get(`/api/v1/chat/group/${props.chatId}/members`).then((response) =>
        {
            console.log(response.data);
            response.data.sort((a : any,b : any) => {return (roles.indexOf(b.role) - roles.indexOf(a.role))});
            console.log(response.data);
            setMembers(response.data);
        }).catch(error =>
        {
            const errorMessage = error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
        });
    },[props.chatId])
    useEffect(() =>
    {
        if (!clicked)
            return;
        axios.get(`/api/v1/chat/group/${props.chatId}/friendsToJoin`).then((response) =>
        {
            setCanInvite(response.data);
        }).catch(error =>
        {
            const errorMessage = error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
        });
    },[clicked])
    useEffect(()=>
    {
        if (!props.socket)
            return;
        const change = (obj : any) =>
        {
            if (props.chatId != obj.payload.groupId)
                return;
            setMembers((m) => {
                if (!m)
                    return;
                let arr : any[]= [...m];

                let index = m.findIndex((memb) => 
                {
                    return (memb.id == obj.payload.userId);
                })
                let ob : any = {name:obj.payload.name,id:obj.payload.userId, role:"MEMBER"};
                if (index != -1) {
                    ob.status = m[index].status;
                }
                if (obj.actionType == 'USER_JOINED' && index == -1)
                {
                    ob.status = "ONLINE";
                    arr = [...arr,ob];
                }
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
                if (obj.actionType == 'USER_LEAVED' && arr[index].id != props.myId.current)
                    arr.splice(index,1);
                arr.sort((a,b) => {return (roles.indexOf(b.role) - roles.indexOf(a.role))});
                return (arr);
            });
        }
        props.socket.off('action',change);
        props.socket.on('action',change);
        return () => {
          props.socket.off('action',change);
        }
    },[props.socket])
    if (!members)
        return null
    let myIndex = members.findIndex((obj) => {return (obj.id == props.myId.current)});
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
        <div className={"overflow-x-hidden flex flex-col flex-1 gap-2 overflow-auto item-center"} style={{ maxHeight: '75vh' }}>
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
                            <button onClick={() => {navigate("/profile/" + obj.id)}} className='icon-container iphone:w-7 iphone:h-7 tablet:w-10 tablet:h-10 '>
                                <img src={"/api/v1/user/avatar?id=" + obj.id} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div className={"user" + obj.id + " status-circle " + status}></div>
                            </button>
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
        (<div className={"overflow-x-hidden flex flex-col flex-1 gap-2 overflow-auto item-center"} style={{ maxHeight: '75vh' }} >
            {canInvite ? (canInvite.map((obj : any,index : number) => {
            return (<div key={index} className="flex flex-col rounded-lg hover:bg-blue-900 p-1">
                <div className="flex flex-col rounded-lg">
                    <div className="flex gap-1 px-3">
                        <div className='icon-container '>
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