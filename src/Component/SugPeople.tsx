import React from 'react';
import { AddIcon } from './Icons';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


interface SugPeopleProps {
  person: {
    id: string; 
    name: string;
  status: string;
  };
}

const SugPeople: React.FC<SugPeopleProps> = ({ person }) => {
  const { id, name} = person;


  const sendFriendRequest = () => {
    useEffect(() => {
      axios
        .post(`${process.env.SERVER_HOST}/api/v1/user/friendRequest`, { userToSendToId: id })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            window.location.href = '/login';
            console.log('Unauthorized');
          }
        });
    }, []);
  };

  return (
    <div className="flex gap-2 items-center text-white iphone:text-[10px] tablet:text-[12px] laptop:text-[18px] bg-background rounded-2xl p-2 laptop:gap-4">
        <Link to={`/profile/${id}`}>
        <img
          src={`${process.env.SERVER_HOST}/api/v1/user/avatar?id=${id}`}
          alt="avatar of user"
          className="w-6 h-6 rounded-full tablet:w-8 tablet:h-8 laptop:w-12 laptop:h-12"
        />
        {name}
      </Link>
      <button onClick={sendFriendRequest}>
        <AddIcon className="w-7 h-7" />
      </button>
    </div>
  );
};

export default SugPeople;
