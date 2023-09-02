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

function Manage(props)
{
    const change = (event,close) =>
    {
        event.preventDefault();
        if (event.target[0].value == "" && event.target[1].value == "")
        {
            close();
            return;
        }
        let obj = {};
        obj.name = event.target[0].value;
        if (props.type == "PROTECTED" && event.target[1].value != "")
            obj.password = event.target[1].value;
        axios.patch(`/api/v1/chat/group/${props.chatId}/update`,(obj)).then(() =>
        {
            close();
        })
    }
    const leaveGroup = (close) =>
    {
        axios.patch(`/api/v1/chat/group/${props.chatId}/leave`).then(() =>
        {
            close();
            return;
        })
    }
    const deleteGroup = (close) =>
    {
        axios.delete(`/api/v1/chat/group/${props.chatId}/delete`).then(() =>
        {
            close();
            return;
        })
    }
    let action = (props.role == "OWNER");
    return (<div className="flex flex-row">
        {
            action && <Popup trigger=
            {<button className="m-auto" ><ManageIcon className="h-7 w-7"/></button>}
            modal nested>
            {
                close => (
                    <form onSubmit={() => change(event,close)} className='flex flex-col gap-4 items-center justify-center bg-[#0C2135] rounded-lg'>
                    <input className="input m-5 w-5" type="text" placeholder="name"/>
                    {(props.type == "PROTECTED") && <input className="input w-5" pattern=".{6,}" title="Must contain at least 6 characters" type="password" placeholder="password"/>}
                        <div>
                            <button className="text-white m-auto mb-4 p-2 rounded-lg bg-blue-500 hover:bg-blue-700 active:scale-90">
                                    Submit
                            </button>
                        </div>
                    </form>
                )
            }
        </Popup>
        }
        <Popup trigger=
            {<button className="m-auto" >{action ? (<DeleteIcon className="h-7 w-7"/>) : (<LeaveIcon className="h-7 w-7"/>)}</button>}
            modal nested>
            {
                close => (
                    <div className="flex flex-col center pt-4 text-white text-center gap-10 bg-[#0C2135]">
                        <p>are you sure ?</p>
                        <div className="flex flex-row justify-around items-center">
                            <button className="mb-4 p-2 rounded-lg bg-blue-500 hover:bg-blue-700 active:scale-90" onClick={() => {action ? deleteGroup(close) : leaveGroup(close)}}>yes</button>
                            <button className="mb-4 p-2 rounded-lg bg-blue-500 hover:bg-blue-700 active:scale-90" onClick={() => {close()}}>no</button>
                        </div>
                    </div>
                )
            }
        </Popup>
    </div>)
}
export default Manage;