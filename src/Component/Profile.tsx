import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { EditIcon } from './Icons';
import MatchHistory from './MatchHistory';
import Friends from './Friends';
import Blocked from './Blocked';
import './Profile.css';
import LogoBar from './LogoBar';
import { useEffect , useState} from 'react';
import axios from 'axios';
import Achievement from './Achievement';
import { useUserContext } from './UserContext';
import { useParams } from 'react-router-dom';

interface Userprofile {
    id: string;
  name: string;
  friendsNumber: number;
  losses: number;
  wins: number;
  }

const Profile = () => {
  const userId = useUserContext();
  const {id} = useParams();
    const [userProfile, setUserProfile] = useState<Userprofile | null>(null);
    const [IsFriend, setIsFriend] = useState<boolean>(false);
    useEffect(() => {
    axios.get(`${process.env.SERVER_HOST}/api/v1/user/profile?id:${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setUserProfile(response.data);
        console.log('userProfile ', userProfile);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          window.location.href = '/login';
          console.log('Unauthorized');
        }
      });
    if (id !== userId)
    {
      axios.get(`${process.env.SERVER_HOST}/api/v1/user/isFriend?otherId:${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setIsFriend(response.data);
        console.log('userProfile ', userProfile);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          window.location.href = '/login';
          console.log('Unauthorized');
        }
      });
    }
  }
  , []);
    return (
        <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden w-[90%]">
        <LogoBar/>
    <div className="flex h-[78vh] w-[90%] m-auto overflow-hidden bg-InboxColor mb-6 rounded-xl iphone:flex-col iphone:gap-3 laptop:flex-row laptop:p-3">
       <div className="flex-3 flex flex-col gap-3 m-auto mt-2 items-center imac:mr-10">
            <div className='text-white flex items-center iphone:flex-row iphone:gap-2 tablet:flex-col '>
                <img src={`${process.env.SERVER_HOST}/api/v1/user/avatar?id=${id}`} alt="avatar" className="iphone:w-10 iphone:h-10 tablet:w-14 tablet:h-14 laptop:w-20 laptop:h-20  imac:w-28 imac:h-28 rounded-full" />
                <div className="flex gap-2 iphone:text-[18px] imac:text-[24px]">
               {userProfile && (
                <>
                  {userProfile.name}
                  <button>
                    <EditIcon className="iphone:w-4 iphone:h-4 imac:w-6 imac:h-6" />
                  </button>
                </>
              )}
                </div>
            </div>
            { (id !== userId) &&
              (
                !IsFriend ? (
                  <button>Add Friend</button>
                ) : (
                  <div className='flex gap-3'>
                    <button>Add Friend</button>
                    <button>Add Friend</button>
                  </div>
               )
             )
          }
            <div className="flex-1 flex flex-col gap-2 w-full items-center iphone:flex-row laptop:flex-col">
                <Achievement />
            </div>
        </div>
        <div className="flex-1 flex  flex-col gap-3 items-center  laptop:border-l-[1px] laptop:border-l-gray-600">
            <div className="flex w-[90%] gap-3 bg-background rounded-xl py-2">
                <div className="flex flex-1 flex-col items-center">
                 <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white">Friends</span>
                 {userProfile && (
                <span className="iphone:text-[10px] tablet:text-[15px] imac:text-[22px] text-white ">
                  {userProfile.friendsNumber}
                </span>
              )}
                </div>
                <div className="flex flex-1 flex-col items-center  border-x-2 border-white ">
                 <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white">Win</span>
                 {userProfile && (
                <span className="iphone:text-[10px] tablet:text-[15px] imac:text-[22px] text-white ">
                  {userProfile.wins}
                </span>
              )}
                </div>
                <div className="flex flex-1 flex-col items-center">
                 <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white">Lose</span>
                 {userProfile && (
                <span className="iphone:text-[10px] tablet:text-[15px] imac:text-[22px] text-white ">
                  {userProfile.losses}
                </span>
              )}
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