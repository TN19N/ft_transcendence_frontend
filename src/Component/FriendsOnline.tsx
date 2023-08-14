import { OnlineIcon } from "./Icons"
import avatar from '../assets/ahmaidi.png'
const FriendsOnline = () => {
    return (
        <div className='flex flex-col gap-2 bar-chat overflow-hidden px-3'>
            <div className="flex justify-between py-5">
                <h3 className="text-white text-xl">Friends</h3>
                <div className=" bg-nberFriendsColor rounded-[50%] p-1">
                    <p className="text-white">12</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 overflow-auto h-[71vh] item-center" style={{ maxHeight: '80vh' }}>
                {
                    [...Array(27)].map((_, i) => (
                        <div key={i}>
                            <div className="flex gap-2 px-3">
                                <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                                    <p className="text-msgColorOn text-[12px]">Ahmaidi</p>
                                    <div className=" ml-auto ">
                                        <OnlineIcon className="w-2 h-2" />
                                    </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default FriendsOnline;