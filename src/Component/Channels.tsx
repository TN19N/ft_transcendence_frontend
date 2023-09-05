import './icon.css';
import { useEffect,useState} from "react";
import './GroupInfo.css';
import axios from "axios";
import Iadd from '../assets/add.png';
import Avatar from '../assets/playerIcon.svg';
import { errorMsg } from "./Poperror";

const join_group = (info :any,channels :any,setChannels :any,index : number) =>
{
    let obj : any = {};
    let doc : any = document.getElementById(info.id);
    if (info.type == "PROTECTED")
      obj.password = doc.value;
    axios.post(`/api/v1/chat/group/${info.id}/join`,obj).then(() =>
    {
        let arr = [...channels];
        arr.splice(index,1);
        setChannels(arr);
    }).catch((error : any) => {
        const errorMessage = error.response?.data?.message || "An error occurred";
        errorMsg(errorMessage);
        if (info.type == "PROTECTED" && doc)
            doc.style.border = "2px solid red";
    });
}
function Channels() : any
{
    const [expand,setExpand]  : any= useState(0);
    const [channels,setChannels] : any = useState(null);
    const [create,setCreate]  : any= useState(0);
    const [refresh,setRefresh]  : any = useState(0);
    useEffect(() =>
    {
        axios.get("/api/v1/chat/group/search").then((response : any) =>
        {
            setChannels(response.data);
        })
    },[refresh]);
    let type = "PUBLIC";
    const create_channel = (event : any) => {
        event.preventDefault();
        console.log(event.target[1].disabled);
        let obj : any = {name: event.target[0].value,type: type};
        if (type == "PROTECTED")
            obj.password = event.target[1].value;
        axios.post("/api/v1/chat/group/create",obj).then(() => {
            let doc = document.getElementById("error_msg");
            if (doc)
                doc.innerHTML = "";
            event.target[1].value = "";
            event.target[0].value = "";

        }).catch((err : any) => {
            let doc = document.getElementById("error_msg");
            if (doc)
                doc.innerHTML = err.response.data.message;
        })
    }
    const setType = (event : any) =>
    {
        let doc : any = document.getElementById("password_prompt");
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
    return (
    <>
    <div className="flex flex-col justify-center">
        <div className="flex justify-between pt-4 z-[0] align-center">
            <h3 className="text-white m-auto text-xl">Channels</h3>
            <button id={create ? "add_icon_click" : "add_icon"} className="h-8 w-8 flex item-center m-auto" onClick={() => {setCreate(create == 0)}}><img src={Iadd}/></button>
        </div>
        <div id={expand ? "expand" : "shrink"} className="pt-3 flex flex-col">
            {!create && <button onClick={() => {setRefresh(refresh ^ 1)}} className="text-blue-500">↻</button>}
            {(!create) ? (channels.map((obj : any,index : number) =>
            {
                return (<div key={index} className="hover:bg-blue-900 rounded-lg flex gap-2 px-3">
                    <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <p className="text-msgColorOn text-[12px]">{obj.name}</p>
                            {(obj.type == "PROTECTED") ? (<div className="text-[8px]" >🔒</div>) : (null)}
                        </div>
                        {(obj.type == "PROTECTED") ? (<input type="password" className="pass_input" id={obj.id}/>) : null}
                    </div>
                    <button onClick={() => {join_group(obj,channels,setChannels,index)}} value={obj.type} className="ml-auto text-white text-[1.3rem]">+</button>
                </div>)
            }))
            :
            (<form onSubmit={create_channel} className="form flex flex-col m-auto overflow-y-scroll overflow-x-hidden gap-5 w-[9rem]">
                <input className="input" type="text" placeholder="name" pattern="[A-Za-z0-9]{1,12}" required title="Max 12 character,alphanumeric only"/>
                <input className="input" disabled id="password_prompt" pattern=".{6,}" required title="Must contain at least 6 characters" type="password" placeholder="password"/>
                <div className="flex flex-col relative">
                    <div><input onClick={setType} className="radio-item" type="radio" name="Gtype" id="PUBLIC" value="PUBLIC" defaultChecked /> <label className="text-white" htmlFor="PUBLIC">PUBLIC</label></div>
                    <div><input onClick={setType} className="radio-item" type="radio" name="Gtype" id="PROTECTED" value="PROTECTED"/> <label className="text-white" htmlFor="PROTECTED">PROTECTED</label></div>
                    <div><input onClick={setType} className="radio-item" type="radio" name="Gtype" id="PRIVATE" value="PRIVATE"/> <label className="text-white" htmlFor="PRIVATE">PRIVATE</label></div>
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