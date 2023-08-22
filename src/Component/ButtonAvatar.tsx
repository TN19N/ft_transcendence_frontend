import React from 'react';
import { useNavigate } from 'react-router';
import { useUserContext } from './UserContext';

interface ButtonAvatarProps {
  id: string;
}

const ButtonAvatar: React.FC<ButtonAvatarProps> = ({ id }) => {
  const userId = useUserContext();
  const navigate = useNavigate();

  const displayProfile = () => {
    if (id !== userId?.id?.toString()) {
      navigate(`/profile/${id}`);
    } else {
      navigate('/profile');
    }
  };

  return (
    <button onClick={displayProfile}>
      <img
        src={
          id !== userId?.id?.toString()
            ? `${process.env.SERVER_HOST}/api/v1/user/avatar?id=${id}`
            : `${process.env.SERVER_HOST}/api/v1/user/avatar`
        }
        alt="avatar"
        className="iphone:w-7 iphone:h-7 tablet:w-12 tablet:h-12 laptop:w-12 laptop:h-12 rounded-full"
      />
    </button>
  );
};

export default ButtonAvatar;
