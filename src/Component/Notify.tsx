import React from "react";
import { CancelIcon, AcceptIcon, PlayingIcon } from "./Icons";
import { useNavigate } from "react-router";
import axios from "axios";
interface Notification {
  idSender: string;
  type: string;
  name: string;
  speed?: string;
}

const Notify: React.FC<Notification> = ({ idSender, type, name, speed }) => {
  const navigate = useNavigate();
  const displayProfile = () => {
    navigate(`/profile/${idSender}`);
  };
  const HandleAccept = () => {
    let location: string;
    if (type === "friend")
      location = `/api/v1/user/acceptFriendRequest?userToFriendId=${idSender}`;
    else
      location = `/api/v1/chat/group/{groupId}/acceptInvite?groupId=${idSender}`;
    if (type !== "game") {
      axios
        .put(`${process.env.SERVER_HOST}${location}`)
        .then(() => {})
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/login");
            console.log("Unauthorized");
          }
        });
    } else {
      navigate(`/game/${idSender}/${speed}?`);
      // socket.emit();
    }
  };
  const HandleReject = () => {
    let location: string;
    if (type === "friend")
      location = `/api/v1/user/friendRequest/sent?reciverId=${idSender}`;
    else location = `/api/v1/user/group/invite?groupId=${idSender}`;
    if (type !== "game")
    {
      axios
      .delete(`${process.env.SERVER_HOST}${location}`, {
        withCredentials: true,
      })
      .then(() => {})
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
          console.log("Unauthorized");
        }
      });
    }
    
  };

  return (
    <div className="flex w-full items-center pl-[2px] iphone:text-[6px] tablet:text-[9px] laptop:text-[13px] iphone:gap-1 iphone:m-[3px] tablet:m-[4px] laptop:m-[6px]">
      <button onClick={displayProfile}>
        <img
          src={`${process.env.SERVER_HOST}/api/v1/user/avatar?id=${idSender}`}
          alt="avatar"
          className="iphone:w-4 iphone:h-4 tablet:w-6 tablet:h-6 laptop:w-8 laptop:h-8 rounded-full"
        />
      </button>
      <span className="break-words laptop:max-w-[165px]">
        {name} sent {type} request
      </span>
      <button onClick={HandleAccept}>
        {type === "friend" || type === "group" ? (
          <AcceptIcon className="iphone:w-3 iphone:h-3 tablet:w-4 tablet:h-4 laptop:w-5 laptop:h-5" />
        ) : (
          <PlayingIcon className="iphone:w-3 iphone:h-3 tablet:w-4 tablet:h-4 laptop:w-5 laptop:h-5" />
        )}
      </button>
      <button onClick={HandleReject}>
        <CancelIcon className="iphone:w-3 iphone:h-3 tablet:w-4 tablet:h-4 laptop:w-5 laptop:h-5" />
      </button>
    </div>
  );
};

export default Notify;
