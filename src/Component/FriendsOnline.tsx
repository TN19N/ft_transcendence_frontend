// @ts-nocheck
import { OnlineIcon } from "./Icons"
import avatar from '../assets/ahmaidi.png'
import { useEffect,useState} from "react";
import axios from "axios"

const FriendsOnline = (props : any) => {
    const [Friends,setFriends] = useState(null);
    useEffect( () => {
        let url = `/api/v1/user/friends`;
        console.log(url);
        axios.get(url).then( (response) =>
        {
            setFriends(response.data);
        }
        )
    },[]
    )
    if (!Friends)
        return null;
    return (
        <div className='flex flex-col gap-2 bar-chat overflow-hidden px-3'>
            <div className="flex justify-between py-5">
                <h3 className="text-white text-xl">Friends</h3>
                <div className=" bg-nberFriendsColor rounded-[50%] p-1">
                    <p className="text-white">{Friends.length}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 overflow-auto h-[71vh] item-center" style={{ maxHeight: '80vh' }}>
                {
                    Friends.map((obj, i) => (
                        <button className="hover:bg-blue-900 rounded-lg" key={i} onClick={() => {props.setChatId(obj.id);props.setName(obj.name)}}>
                            <div className="flex gap-2 px-3">
                                <img src={`/api/v1/user/avatar?id=${obj.id}`} alt="avatar" className="w-10 h-10 rounded-full" />
                                    <p className="text-msgColorOn text-[12px]">{obj.name}</p>
                                    <div className=" ml-auto">
                                    </div>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

export default FriendsOnline;