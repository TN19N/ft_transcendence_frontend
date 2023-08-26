import React from "react";
import { CancelIcon, AcceptIcon, PlayingIcon } from "./Icons";
import { useNavigate } from "react-router";
import axios from "axios";
import { Notification } from "./UserContext";

enum NotificationType {
  FRIEND_REQUEST = "FRIEND_REQUEST",
  GROUP_INVITE = "GROUP_INVITE",
  GAME_INVITE = "GAME_INVITE",
}

interface NotifyProps {
  notification: Notification;
  removeNotification: (notification: Notification) => void;
}

const Notify: React.FC<NotifyProps> = ({
  notification,
  removeNotification,
}) => {

  const navigate = useNavigate();
  
  const displayProfile = () => {
    navigate(`/profile/${notification.payload.id}`);
  };

  const handleAccept = () => {
    const location =
      notification.type === NotificationType.FRIEND_REQUEST
        ? `/api/v1/user/acceptFriendRequest?userToFriendId=${notification.payload.id}`
        : `/api/v1/chat/group/{groupId}/acceptInvite?groupId=${notification.payload.id}`;

    if (notification.type !== NotificationType.GAME_INVITE) {
      axios
        .put(`${process.env.SERVER_HOST}${location}`)
        .then(() => {})
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/login");
          }
        });
    } else {
      axios.post(
        `${process.env.SERVER_HOST}/api/v1/user/acceptGameInvite?reciverId=${notification.payload.id}`
      ).then(()=>{
        navigate(
        `/play/${notification.payload.id}/${notification.payload.speed}`
      );
      }).catch((error)=>{
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login");
        }
      })
      
    }
    removeNotification(notification);
  };

  const handleReject = () => {
    const location =
      notification.type === NotificationType.FRIEND_REQUEST
        ? `/api/v1/user/friendRequest?senderId=${notification.payload.id}`
        : `/api/v1/user/group/invite?groupId=${notification.payload.id}`;

    if (notification.type !== NotificationType.GAME_INVITE) {
      axios
        .delete(`${process.env.SERVER_HOST}${location}`, {
          withCredentials: true,
        })
        .then(() => {})
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/login");
          }
        });
    }
    removeNotification(notification);
  };
return (
  <div className="flex w-full items-center pl-[2px] iphone:text-[6px] tablet:text-[9px] laptop:text-[13px] iphone:gap-1 iphone:m-[3px] tablet:m-[4px] laptop:m-[6px]">
    <button onClick={displayProfile}>
      <img
        src={`${process.env.SERVER_HOST}/api/v1/user/avatar?id=${notification.payload.id}`}
        alt="avatar"
        className="w-8 h-8 rounded-full"
      />
    </button>
    <span className="break-words laptop:max-w-[165px]">
      {notification.payload.name} sent {notification.type}
    </span>
    <button onClick={handleAccept}>
      {notification.type === NotificationType.FRIEND_REQUEST ||
      notification.type === NotificationType.GROUP_INVITE ? (
        <AcceptIcon className="w-5 h-5" />
      ) : (
        <PlayingIcon className="w-5 h-5" />
      )}
    </button>
    <button onClick={handleReject}>
      <CancelIcon className="w-5 h-5" />
    </button>
  </div>
);
 
};



export default Notify;