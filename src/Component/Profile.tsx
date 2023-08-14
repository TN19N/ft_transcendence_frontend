import Avatar from '../assets/ahmaidi.png';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { EditIcon } from './Icons';
import MatchHistory from './MatchHistory';
import Friends from './Friends';
import Blocked from './Blocked';
import './Profile.css';
import LogoBar from './LogoBar';
const Profile = () => {
    return (
        <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden w-[90%]">
        <LogoBar />
    <div className="flex h-[78vh] w-[90%] m-auto overflow-hidden bg-InboxColor mb-6 rounded-xl iphone:flex-col iphone:gap-3 laptop:flex-row laptop:p-3">
       <div className="flex-3 flex flex-col gap-3 m-auto mt-2 items-center imac:mr-10">
            <div className='text-white flex items-center iphone:flex-row iphone:gap-2 tablet:flex-col '>
                <img src={Avatar} alt="avatar" className="iphone:w-10 iphone:h-10 tablet:w-14 tablet:h-14 laptop:w-20 laptop:h-20  imac:w-28 imac:h-28 rounded-full" />
                <div className="flex gap-2 iphone:text-[18px] imac:text-[24px]">
                Ahmaidi<button><EditIcon className='iphone:w-4 iphone:h-4 imac:w-6 imac:h-6'/></button>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 w-full items-center iphone:flex-row laptop:flex-col">
            <span className="text-white iphone:text-[12px] tablet:text-[16px] tablet:self-center imac:text-[25px]">Achievement : </span>
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
        <div className="flex-1 flex  flex-col gap-3 items-center  laptop:border-l-[1px] laptop:border-l-gray-600">
            <div className="flex w-[90%] gap-3 bg-background rounded-xl py-2">
                <div className="flex flex-1 flex-col items-center">
                 <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white">Friends</span>
                 <span className="iphone:text-[10px] tablet:text-[15px] imac:text-[22px] text-white ">8</span> 
                </div>
                <div className="flex flex-1 flex-col items-center  border-x-2 border-white ">
                 <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white">Win</span>
                 <span className="iphone:text-[10px] tablet:text-[15px] imac:text-[22px] text-white ">8</span> 
                </div>
                <div className="flex flex-1 flex-col items-center">
                 <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white">Lose</span>
                 <span className="iphone:text-[10px] tablet:text-[15px] imac:text-[22px] text-white">8</span> 
                </div>
            </div>
            <Tabs className="w-[90%]" variant='enclosed'>
                <TabList className="flex w-full" mb='1em'>
                    <Tab flex = '1'>
                        <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white overflow-hidden ">History Match</span>
                    </Tab>
                    <Tab flex = '1'>
                        <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white overflow-hidden ">Friends</span>
                    </Tab>
                    <Tab flex = '1'>
                        <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white overflow-hidden ">Blocked people</span>
                    </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <MatchHistory/>
                  </TabPanel>
                  <TabPanel>
                    <Friends />
                  </TabPanel>
                  <TabPanel>
                    <Blocked/>
                  </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
    </div>
    );
}

export default Profile;