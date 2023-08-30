// @ts-nocheck
import './icon.css';
import { OnlineIcon } from "./Icons"
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


const roles = ["MEMBER_MUTED","MEMBER","ADMIN","OWNER"];
const actions = ["","","",""]

function Actions(props)
{
    const action = (name) =>
    {
        let query = name[0].toUpperCase() + name.slice(1); 
        if (name == "upgrade" || name == "downgrade")
            name += "Member";
        if (name == "transfer")
            name += "Ownership"
        axios.patch(`/api/v1/chat/group/${props.gid}/${name}?userTo${query}Id=${props.id}`).then(() =>
        {
            let arr = [...props.members];
            if (name == "mute")
                arr[props.index].role = "MEMBER_MUTED";
            if (name == "unMute")
                arr[props.index].role = "MEMBER";
            if (name == "upgradeMember")
                arr[props.index].role = "ADMIN";
            if (name == "downgradeMember")
                arr[props.index].role = "MEMBER";
            if (name == "transferOwnership")
            {
                arr[props.index].role = "OWNER";
                arr[0].role = "MEMBER";
            }
            if (name == "ban")
                arr.splice(props.index,1);
            arr.sort((a,b) => {return (roles.indexOf(a.role) < roles.indexOf(b.role))});
            props.setMembers(arr);
        })
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

const invite=(gid,uid,canInvite,setCanInvite,index) => {
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
    if (!props.chatId)
        return null
    const [member,setMember] = useState("");
    const [members,setMembers] = useState(null);
    const [canInvite,setCanInvite] = useState(null);
    const [clicked,setClick] = useState(0);
    useEffect(() =>
    {
        axios.get(`/api/v1/chat/group/${props.chatId}/members`).then((response) =>
        {
            response.data.sort((a,b) => {return (roles.indexOf(a.role) < roles.indexOf(b.role))});
            setMembers(response.data);
        })
        axios.get(`/api/v1/chat/group/${props.chatId}/friendsToJoin`).then((response) =>
        {
            setCanInvite(response.data);
        })
    },[props.chatId])

    if (!members)
        return null
    let myIndex = members.findIndex((obj) => {return (obj.id == props.myId)});
    let inv_func = [invite,uninvite];
    return (<>
        <div className="flex justify-between py-2 align-center">
            <h3 className="text-white m-auto text-xl">Members</h3>
            <button id={clicked ? "add_icon_click" : "add_icon"} className="h-8 w-8 flex item-center m-auto" onClick={() => {setClick(clicked == 0)}}><img src={Iadd}/></button>
        </div>
    <div id="parent">
        <div id={clicked ? "fade_right" : "fade_normal_r"} className={"overflow-x-hidden flex flex-col flex-1 gap-2 overflow-auto item-center"} style={{ maxHeight: '80vh' }}>
            {members.map((obj,index) => {
                let icon = Ic_owner;
                if (obj.role != "OWNER")
                    icon = (obj.role == "ADMIN") ? Imoderate : Iunmoderate;
                return (<div className="flex flex-col rounded-lg hover:bg-blue-900 p-1">
                    <div className="flex flex-col align-center rounded-lg">
                        <div className="flex gap-3 px-3">
                            <div class='icon-container m-auto'>
                                <img src={"/api/v1/user/avatar?id=" + obj.id} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div id='status-circle'></div>
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
        <div id={clicked ? "fade_normal_l" : "fade_left"} className={"overflow-x-hidden flex flex-col flex-1 gap-2 overflow-auto item-center"} style={{ maxHeight: '80vh' }} >
                {canInvite ? (canInvite.map((obj,index) => {
                return (<div className="flex flex-col rounded-lg hover:bg-blue-900 p-1">
                    <div className="flex flex-col rounded-lg">
                        <div className="flex gap-1 px-3">
                            <div class='icon-container '>
                                <img src={"/api/v1/user/avatar?id=" + obj.id} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div id='status-circle'></div>
                            </div>
                            <div className="flex flex-1 flex-col">
                                <p className="text-msgColorOn text-[0.75rem] whitespace-nowrap">{obj.name}</p>
                            </div>
                            <div className="flex flex-1 flex-row gap-1 items-center justify-end">
                            <button className="text-[1.3rem] text-white" onClick={() => {obj.isInvited ? uninvite(props.chatId,obj.id,canInvite,setCanInvite,index) : invite(props.chatId,obj.id,canInvite,setCanInvite,index)}}>{obj.isInvited ? '×' : '+'}</button>
                            </div>
                        </div>
                    </div>
                </div>)
            })) : 
            (
                null
            )
            }
        </div>
    </div> 
</>);
}

export default GroupInfo;
