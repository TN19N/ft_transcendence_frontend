import Avatar from '../assets/ahmaidi.png';
import { EditIcon } from './Icons';
import './Profile.css';
import Score from './Score';
const Profile = () => {
    return (
    <div className="flex h-[78vh] w-[90%] m-auto bg-InboxColor mb-6 rounded-xl">
       <div className="flex-3 flex flex-col gap-3 m-auto ">
            <div className='text-white flex-3 flex flex-col'>
                <img src={Avatar} alt="avatar" className="w-[18vh] h-[18vh] rounded-full" />
                <div className="self-center flex gap-2 text-xl">
                Ahmaidi<button><EditIcon className='w-4 h-4'/></button>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 w-full">
            <span className="text-lg text-white">Achievement:</span>
            <div className="box-content h-16 w-20 border-1 bg-white self-center">
            </div>
            <div className="box-content h-16 w-20 border-1 bg-white self-center">
            </div>
            <div className="box-content h-16 w-20 border-1 bg-white self-center">
            </div>
            <div className="box-content h-16 w-20 border-1 bg-white self-center">
            </div>
            </div>
        </div>
        <div className="flex-1 flex  flex-col gap-5 items-center justify-center">
            <div className="flex w-[90%] gap-3 bg-background rounded-xl py-2">
                <div className="flex flex-1 flex-col items-center">
                 <span className="text-3xl text-white">Friends</span>
                 <span className="text-xl text-white ">8</span> 
                </div>
                <div className="flex flex-1 flex-col items-center  border-x-2 border-white ">
                 <span className="text-3xl text-white">Win</span>
                 <span className="text-xl text-white ">8</span> 
                </div>
                <div className="flex flex-1 flex-col items-center">
                 <span className="text-3xl text-white">Lose</span>
                 <span className="text-xl text-white">8</span> 
                </div>
            </div>
            <span className="text-3xl text-white overflow-hidden ">History Match</span>
            <div className='flex w-[90%] flex-col gap-3 items-center  overflow-auto h-[42vh]'>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
                <Score/>
            </div>
        </div>
    </div>
    );
}

export default Profile;