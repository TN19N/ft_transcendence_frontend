import React, { useEffect, useState } from "react";
import { AddIcon } from "./Icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface SugPeopleProps {
  person: {
    id: string;
    name: string;
    status: string;
  };
  FriendRequestSent: () => void;
}

const SugPeople: React.FC<SugPeopleProps> = ({ person, FriendRequestSent }) => {
  const { id, name } = person;
  const navigate = useNavigate();
  const [WaitingAccept, setWaitingAccept] = useState<boolean>(true);
  const [IsFriend, setIsFriend] = useState<boolean>(true);
  const [Render, setRender] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_HOST}/api/v1/user/isFriend?otherId=${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsFriend(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      });
    axios
      .get(
        `${process.env.SERVER_HOST}/api/v1/user/isFriendRequestSent?otherId=${id}`
      )
      .then((response) => {
        setWaitingAccept(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      });
  }, [id, Render]);

  const sendFriendRequest = () => {
    axios
      .post(
        `${process.env.SERVER_HOST}/api/v1/user/friendRequest?userToSendToId=${id}`
      )
      .then(() => {
        setRender((prevState) => !prevState);
        FriendRequestSent();
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      });
  };

  return (
    <div className="flex gap-2 items-center justify-between text-white iphonet:w-[90%] tablet:w-[40%] laptop:w-[25%] max-w-[300px] iphone:text-[8px] tablet:text-[10px] laptop:text-[18px] bg-background rounded-xl p-2 laptop:gap-4">
      <Link to={`/profile/${id}`}>
        <img
          src={`${process.env.SERVER_HOST}/api/v1/user/avatar?id=${id}`}
          alt="avatar of user"
          className="w-6 h-6 rounded-full tablet:w-8 tablet:h-8 laptop:w-12 laptop:h-12"
        />
        {name}
      </Link>
      {!WaitingAccept && !IsFriend && (
        <button onClick={sendFriendRequest}>
          <AddIcon className="w-5 h-5 tablet:w-7 tablet:h-7" />
        </button>
      )}
    </div>
  );
};

export default SugPeople;
