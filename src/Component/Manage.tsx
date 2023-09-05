
import './icon.css';
import { DeleteIcon, LeaveIcon} from "./Icons"
import './GroupInfo.css';
import axios from "axios";
import { ManageIcon} from './Icons';
import Popup from 'reactjs-popup';
import { errorMsg } from "./Poperror";

function Manage(props : any)
{
    let type = props.type;
    const change : any = (event : any,close : any) => {
        event.preventDefault();
        let obj : any= {type: type};
        if (event.target[0].value != "")
            obj.name = event.target[0].value;
        if (type == "PROTECTED" && event.target[1].value != "")
            obj.password = event.target[1].value;
        axios.patch(`/api/v1/chat/group/${props.chatId}/update`,obj).then(() => {
            close();
            return;
        }).catch(error => {
            const errorMessage = error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
            close();
        })
    }
    const leaveGroup = (close : any) =>
    {
        axios.patch(`/api/v1/chat/group/${props.chatId}/leave`).then(() =>
        {
            close();
            return;
        }).catch(error =>
        {
            const errorMessage = error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
        });
    }
    const deleteGroup = (close : any) =>
    {
        axios.delete(`/api/v1/chat/group/${props.chatId}/delete`).then(() =>
        {
            close();
            return;
        }).catch(error =>
        {
            const errorMessage = error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
        });
    }
    const setType = (event : any) =>
    {
        let doc : any = document.getElementById("change_password_prompt");
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
    let action = (props.role == "OWNER");
    const changePopup : any = (close : () => void) => 
    {
        return (<form onSubmit={(event) => {change(event,close)}} className="form flex flex-col pt-4 rounded-lg m-auto bg-[#0C2135] overflow-hidden gap-5">
            <input className="input m-auto" type="text" placeholder="name" pattern="[A-Za-z0-9]{1,12}" title="Max 12 character,alphanumeric only"/>
            <input className="input m-auto" disabled id="change_password_prompt" pattern=".{6,}" title="Must contain at least 6 characters" type="password" placeholder="password"/>
            <div className="flex flex-col m-auto relative">
                <div><input onClick={setType} className="radio-item" type="radio" name="Gtype" id="PUBLIC" value="PUBLIC" /> <label className="text-white" htmlFor="PUBLIC">PUBLIC</label></div>
                <div><input onClick={setType} className="radio-item" type="radio" name="Gtype" id="PROTECTED" value="PROTECTED"/> <label className="text-white" htmlFor="PROTECTED">PROTECTED</label></div>
                <div><input onClick={setType} className="radio-item" type="radio" name="Gtype" id="PRIVATE" value="PRIVATE"/> <label className="text-white" htmlFor="PRIVATE">PRIVATE</label></div>
            </div>
            <div id="error_msg" className="text-center text-red-800 text-sm"></div>
            <input type="submit" className="text-white m-auto mb-4 w-[50%] rounded-lg bg-blue-500 hover:bg-blue-700 active:scale-90" value="Change"/>
        </form>)
    }
    const permPopup : any = (close : () => void) =>  {
        return (
            <div className="flex flex-col center pt-4 text-white text-center gap-10 bg-[#0C2135]">
                <p>are you sure ?</p>
                <div className="flex flex-row justify-around items-center">
                    <button className="mb-4 p-2 rounded-lg bg-blue-500 hover:bg-blue-700 active:scale-90" onClick={() => {action ? deleteGroup(close) : leaveGroup(close)}}>yes</button>
                    <button className="mb-4 p-2 rounded-lg bg-blue-500 hover:bg-blue-700 active:scale-90" onClick={() => {close()}}>no</button>
                </div>
            </div>
        )
    }
    return (
    <div className="flex flex-row">
        {
            action && <Popup trigger=
            {<button className="m-auto" ><ManageIcon className="h-7 w-7"/></button>}
            modal nested>
            {
                changePopup
            }
        </Popup>
        }
        <Popup trigger=
            {<button className="m-auto" >{action ? (<DeleteIcon className="h-7 w-7"/>) : (<LeaveIcon className="h-7 w-7"/>)}</button>}
            modal nested>
            {
                permPopup
            }
        </Popup>
    </div>
)
}
export default Manage;