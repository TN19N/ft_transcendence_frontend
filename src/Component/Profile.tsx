import Avatar from '../assets/ahmaidi.png';
import { EditIcon } from './Icons';
import Score from './Score';
import LogoBar from './LogoBar';
const Profile = () => {
    return (
        <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden w-[90%]">
        <LogoBar />
    <div className="flex h-[78vh] w-[90%] m-auto overflow-hidden bg-InboxColor mb-6 rounded-xl iphone:flex-col iphone:gap-3 laptop:flex-row laptop:p-3">
       <div className="flex-3 flex flex-col gap-3 m-auto mt-2">
            <div className='text-white flex-3 flex items-center iphone:flex-row iphone:gap-2 tablet:flex-col'>
                <img src={Avatar} alt="avatar" className="iphone:w-10 iphone:h-10 tablet:w-14 tablet:h-14 laptop:w-20 laptop:h-20 rounded-full" />
                <div className="flex gap-2 iphone:text-[18px]">
                Ahmaidi<button><EditIcon className='iphone:w-4 iphone:h-4'/></button>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 w-full items-center iphone:flex-row laptop:flex-col">
            <span className="text-white iphone:text-[12px] tablet:text-[16px] tablet:self-center">Achievement : </span>
            <div className="box-content border-1 bg-white iphone:h-5 iphone:w-5 tablet:w-12 tablet:h-12 laptop:w-16 laptop:h-16">
            </div>
            <div className="box-content iphone:h-5 iphone:w-5 border-1 bg-white tablet:w-12 tablet:h-12 laptop:w-16 laptop:h-16">
            </div>
            <div className="box-content iphone:h-5 iphone:w-5 border-1 bg-white tablet:w-12 tablet:h-12 laptop:w-16 laptop:h-16">
            </div>
            <div className="box-content iphone:h-5 iphone:w-5 border-1 bg-white tablet:w-12 tablet:h-12 laptop:w-16 laptop:h-16">
            </div>
            </div>
        </div>
        <div className="flex-1 flex  flex-col gap-3 items-center justify-center">
            <div className="flex w-[90%] gap-3 bg-background rounded-xl py-2">
                <div className="flex flex-1 flex-col items-center">
                 <span className="iphone:text-[13px] tablet:text-[18px] text-white">Friends</span>
                 <span className="iphone:text-[10px] tablet:text-[15px] text-white ">8</span> 
                </div>
                <div className="flex flex-1 flex-col items-center  border-x-2 border-white ">
                 <span className="iphone:text-[13px] tablet:text-[18px] text-white">Win</span>
                 <span className="iphone:text-[10px] tablet:text-[15px] text-white ">8</span> 
                </div>
                <div className="flex flex-1 flex-col items-center">
                 <span className="iphone:text-[13px] tablet:text-[18px] text-white">Lose</span>
                 <span className="iphone:text-[10px] tablet:text-[15px] text-white">8</span> 
                </div>
            </div>
            <span className="iphone:text-[13px] tablet:text-[18px] text-white overflow-hidden ">History Match</span>
            <div className='flex w-[90%] flex-col gap-3 items-center  overflow-auto h-[42vh] tablet:h-[28vh] laptop:h-[48vh]'>
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
    </div>
    );
}

export default Profile;