import React from "react";
import { CancelIcon, AcceptIcon, PlayingIcon } from "./Icons";
import { useNavigate } from "react-router";
interface Notification {
  idSender: string;
  type: string;
  name: string;
}

const Notify: React.FC<Notification> = ({ idSender, type, name }) => {
  const navigate = useNavigate();
  const displayProfile = () => {
      navigate(`/profile/${idSender}`);
  };
  return (
    <div className="flex w-full items-center pl-[2px] iphone:text-[5px] tablet:text-[7px] laptop:text-[10px] iphone:gap-1 iphone:m-[3px] tablet:m-[4px] laptop:m-[6px]">
      <button onClick={displayProfile}>
        <img
          src={`${process.env.SERVER_HOST}/api/v1/user/avatar?id=${idSender}`}
          alt="avatar"
          className="iphone:w-4 iphone:h-4 tablet:w-6 tablet:h-6 laptop:w-8 laptop:h-8 rounded-full"
        />
      </button>
      <span>{name}</span>
      <span>sent {type} request</span>
      {
        (type === "friend") ?<AcceptIcon className="iphone:w-3 iphone:h-3 tablet:w-4 tablet:h-4 laptop:w-5 laptop:h-5" />
        : <PlayingIcon className="iphone:w-3 iphone:h-3 tablet:w-4 tablet:h-4 laptop:w-5 laptop:h-5" />
      }
      <CancelIcon className="iphone:w-3 iphone:h-3 tablet:w-4 tablet:h-4 laptop:w-5 laptop:h-5" />
    </div>
  );
};

export default Notify;
