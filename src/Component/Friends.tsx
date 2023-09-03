import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ButtonAvatar from "./ButtonAvatar";
import InviteGame from "./InviteGame";
import { errorMsg } from "./Poperror";
interface Friend {
  id: string;
  name: string;
  status: string;
}

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_HOST}/api/v1/user/friends`, {
        withCredentials: true,
      })
      .then((response) => {
        setFriends(response.data);
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
  }, []);

  return (
    <div className="flex w-full items-center text-white text-[13px] tablet:text-[18px] laptop:text-[20px] imac:text-[24px]">
      <div className="flex flex-col w-full items-center gap-3">
        {friends.length !== 0 ? (
          <>
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex iphone:w-[90%] tablet:w-[70%] m-auto bg-background p-3 rounded-xl items-center justify-center gap-3"
              >
                <ButtonAvatar id={friend.id} />
                <span className="iphone:min-w-[80px] tablet:min-w-[140px] laptop:min-w-[180px]">
                  {friend.name}
                </span>
                <InviteGame id={friend.id} className="w-3 h-3 iphone:w-6 iphone:h-6 tablet:w-8 tablet:h-8 laptop:w-10 laptop:h-10"/>
              </div>
            ))}
          </>
        ) : (
          <div className="flex iphone:w-[90%] tablet:w-[70%] m-auto bg-background p-3 rounded-xl items-center justify-center gap-3">
            <span>No Friends Yet</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
