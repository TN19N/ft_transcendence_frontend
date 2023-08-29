import { UnblockIcon } from "./Icons";
import ButtonAvatar from "./ButtonAvatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface BlockedUser {
  id: string,
  name:string
}

export default function Blocked() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.SERVER_HOST}/api/v1/user/baned`, { withCredentials: true })
      .then((response) => {
        setBlockedUsers(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate('/login');
        }
      });
  }, []);
  const unblockUser = (userId: string) => {
    axios.delete(`${process.env.SERVER_HOST}/api/v1/user/unBan?userToUnBanId=${userId}`, { withCredentials: true })
      .then(() => {
        setBlockedUsers(prevBlockedUsers => prevBlockedUsers.filter(user => user.id !== userId));

      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate('/login');
        }
      });
  };

  return (
    <div className="flex flex-col w-full m-auto text-white iphone:text-[13px] tablet:text-[18px] laptop:text-[20px] imac:text-[24px] gap-3">
      {blockedUsers.length !== 0 ? (
        blockedUsers.map((blockedUser, index) => (
          <div
            key={index}
            className="flex  iphone:[90%] tablet:w-[70%] m-auto gap-3 bg-background p-2 rounded-xl justify-evenly"
          >
            <div className="flex items-center gap-2">
              <ButtonAvatar id={blockedUser.id} />
              <span>{blockedUser.name}</span>
            </div>
            <button
              className="bg-buttonPlaybgColor rounded-[50%]"
              onClick={() => unblockUser(blockedUser.id)}
            >
              <UnblockIcon className="w-8 h-6 tablet:w-8 tablet:h-8 laptop:w-10 laptop:h-10" />
            </button>
          </div>
        ))
      ) : (
        <div className="flex  iphone:[90%] tablet:w-[70%] m-auto justify-center p-3 bg-background rounded-xl ">
          <span>Blocked list is empty</span>
        </div>
      )}
    </div>
  );
}
