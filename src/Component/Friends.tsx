import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ButtonAvatar from './ButtonAvatar';

interface Friend {
  id: string;
  name: string;
  status: string;
}

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.SERVER_HOST}/api/v1/user/friends`, { withCredentials: true })
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate('/login');
          console.log('Unauthorized');
        }
      });
  }, [navigate]);

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
                <span className="mb-2">{friend.name}</span>
              </div>
            ))}
          </>
        ) : (
          <span>No Friends Yet</span>
        )}
      </div>
    </div>
  );
};

export default Friends;
