import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { EditIcon } from "./Icons";
import Friends from "./Friends";
import Blocked from "./Blocked";
import "./Profile.css";
import LogoBar from "./LogoBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Achievement from "./Achievement";
import { Link, useNavigate, useParams } from "react-router-dom";
import MatchHistory from "./MatchHistory";
import ProfileButton from "./ProfileButton";
import ProfileInfo from "./ProfileInfo";
import { useUserContext } from "./UserContext";
import { errorMsg } from "./Poperror";


interface Userprofile {
  id: string;
  name: string;
  friendsNumber: number;
  losses: number;
  wins: number;
}

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = useUserContext();
  const [userProfile, setUserProfile] = useState<Userprofile | null>(null);

  const fetchUserProfile = (id: string | undefined) => {
    const url = id
      ? `${process.env.SERVER_HOST}/api/v1/user/profile?id=${id}`
      : `${process.env.SERVER_HOST}/api/v1/user/profile`;

    return axios.get(url, { withCredentials: true });
  };

  useEffect(() => {
    fetchUserProfile(id)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          errorMsg(errorMessage);
        }
      });
  }, [navigate]);
  return (
    <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-xl overflow-hidden w-[90%]">
      <LogoBar />
      <div className="flex h-[78vh] w-[90%] m-auto overflow-hidden bg-InboxColor mb-6 rounded-xl iphone:flex-col iphone:gap-3 laptop:flex-row laptop:p-3">
        <div className="flex-3 flex flex-col gap-3 m-auto mt-2 items-center">
          <div className="text-white flex items-center iphone:flex-row iphone:gap-2 tablet:flex-col ">
            <img
              src={
                id
                  ? `${process.env.SERVER_HOST}/api/v1/user/avatar?id=${id}`
                  : `${process.env.SERVER_HOST}/api/v1/user/avatar`
              }
              alt="avatar"
              className=" w-5 h-5 iphone:w-10 iphone:h-10 tablet:w-14 tablet:h-14 laptop:w-20 laptop:h-20  imac:w-28 imac:h-28 rounded-full"
            />
            <div className="flex gap-2 iphone:text-[18px] imac:text-[24px]">
              {userProfile && (
                <>
                  {userProfile.name}
                  {!id && (
                    <Link to="/editprofile">
                      <button>
                        <EditIcon className="iphone:w-4 iphone:h-4 imac:w-6 imac:h-6" />
                      </button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          {id && <ProfileButton id={id} />}
          <div className="flex-1 flex flex-col gap-2 w-full items-center iphone:flex-row laptop:flex-col">
            <Achievement />
          </div>
        </div>
        <div className="flex-1 flex  flex-col gap-3 items-center  laptop:border-l-[1px] laptop:border-l-gray-600">
          <ProfileInfo ProfileInfo={userProfile} />

          <div className=" flex flex-col items-center w-[90%] m-auto">
            {id ? (
              <div className="flex-1 w-full ">
                <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white self-center">
                  History Match
                </span>
                <div className="overflow-hidden h-[51vh] laptop:[60vh]">
                  <MatchHistory id={id} />
                </div>
              </div>
            ) : (
              <Tabs className="w-[90%] overflow-hidden" variant="enclosed">
                <TabList
                  className="flex w-full iphone:text-[10px] tablet:text-[18px] imac:text-[25px] text-white "
                  mb="1em"
                >
                  <Tab flex="1">
                    <span>History Match</span>
                  </Tab>
                  <Tab flex="1">
                    <span>Friends</span>
                  </Tab>
                  <Tab flex="1">
                    <span>Blocked people</span>
                  </Tab>
                </TabList>
                <TabPanels className="overflow-auto iphone:h-[38vh] table:h-[35vh] laptop:h-[49vh]">
                  <TabPanel>
                    {userId?.id && <MatchHistory id={userId.id.toString()} />}
                  </TabPanel>
                  <TabPanel>
                    <Friends />
                  </TabPanel>
                  <TabPanel>
                    <Blocked />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
