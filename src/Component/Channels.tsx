// @ts-nocheck

import './icon.css';
import { DeleteIcon, LeaveIcon} from "./Icons"
import { useEffect,useState} from "react";
import './GroupInfo.css';
import axios from "axios";
import Iadd from '../assets/add.png';
import Avatar from '../assets/playerIcon.svg';
import { ManageIcon} from './Icons';
import Popup from 'reactjs-popup';
import { errorMsg } from "./Poperror";

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
    }).catch((error) => {
        const errorMessage = error.response?.data?.message || "An error occurred";
        errorMsg(errorMessage);
        if (info.type == "PROTECTED")
            doc.style.border = "2px solid red";
    });
}
function Channels(props)
{
    const [expand,setExpand] = useState(0);
    const [channels,setChannels] = useState(null);
    const [create,setCreate] = useState(0);
    const [refresh,setRefresh] = useState(0);
    useEffect(() =>
    {
        axios.get("/api/v1/chat/group/search").then((response) =>
        {
            setChannels(response.data);
        })
    },[refresh]);
    let type = "PUBLIC";
    const create_channel = (event) => {
        event.preventDefault();
        console.log(event.target[1].disabled);
        let obj = {name: event.target[0].value,type: type};
        if (type == "PROTECTED")
            obj.password = event.target[1].value;
        axios.post("/api/v1/chat/group/create",obj).then(res => {
            document.getElementById("error_msg").innerHTML = "";
            event.target[1].value = "";
            event.target[0].value = "";

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
        <div className="flex justify-between pt-4 z-[0] align-center">
            <h3 className="text-white m-auto text-xl">Channels</h3>
            <button id={create ? "add_icon_click" : "add_icon"} className="h-8 w-8 flex item-center m-auto" onClick={() => {setCreate(create == 0)}}><img src={Iadd}/></button>
        </div>
        <div id={expand ? "expand" : "shrink"} className="pt-3 flex flex-col">
            {!create && <button onClick={() => {setRefresh(refresh ^ 1)}} className="text-blue-500">↻</button>}
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

export default Channels;