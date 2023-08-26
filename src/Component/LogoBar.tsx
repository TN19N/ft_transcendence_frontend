import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon, AuthenIcon, LogOutIcon, LogoIcon, NavProfileIcon } from './Icons';
import NavBar from './NavBar';
import Notification from './Notification';
import axios from 'axios';
import Disable2fa from './Disable2fa';
import Enable2fa from './Enable2fa';
import { useUserContext } from './UserContext';


const LogoBar: React.FC = () => {
  const userId = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);
  const [UserName, setUserName] = useState<string>("");
  const [Render, setRender] = useState<boolean>(false); // Fixed the typo "flase" to "false"

  const Disable = () => {
    setRender((prevState) => !prevState);
  };

  useEffect(() => {
    axios.get(`${process.env.SERVER_HOST}/api/v1/user/preferences`, { withCredentials: true })
      .then((response) => {
        setIs2FAEnabled(response.data.isTwoFactorAuthenticationEnabled);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      });

    axios.get(`${process.env.SERVER_HOST}/api/v1/user/profile`, { withCredentials: true })
      .then((response) => {
        setUserName(response.data.name);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      });
  }, [Render]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const logout = () => {
    axios.post(`${process.env.SERVER_HOST}/api/v1/auth/logout`)
      .then(() => {
        window.location.href = '/login';
      })
      .catch(() => {
      });
  };

  return (
    <div className="flex justify-between items-center w-[95%] m-auto mt-2">
      <Link to="/">
        <LogoIcon className="mx-2 iphone:w-[25px] iphone:h-[25px] tablet:w-[40px] tablet:h-[40px] laptop:w-[50px] laptop:h-[50px]" />
      </Link>
      <NavBar />
      <div className="flex items-center iphone:[30%] iphone:gap-2 tablet:gap-4">
        {userId?.notifications && <Notification />}
        <div className="relative">
          <div
            className="flex items-center text-white gap-1"
            onClick={toggleDropdown}
          >
            <img
              src={`${process.env.SERVER_HOST}/api/v1/user/avatar`}
              alt="avatar"
              className="rounded-full iphone:w-5 iphone:h-5 tablet:w-7 tablet:h-7 laptop:w-9 laptop:h-9"
            />
            <span className="flex items-center gap-1 iphone:text-[10px] tablet:text-[12px] laptop:text-[16px]">
              {UserName}
              <ArrowIcon
                className={`iphone:w-2 iphone:h-2 tablet:w-3 tablet:h-3 cursor-pointer ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </span>
          </div>
          {isDropdownOpen && (
            <div className="absolute text-white right-0 rounded bg-background border-[1px] mt-1 text-[4px] tablet:text-[12px] laptop:text-[14px] imac:text-[20px]">
              <div className="flex flex-col items-start cursor-pointer">
                <Link to="/profile">
                  <div className="flex gap-1 items-center p-1">
                    <NavProfileIcon className="w-2 h-2 tablet:w-5 tablet:h-5 " />
                    Profile
                  </div>
                </Link>
                <div className="border-t-[0.5px] border-b-[0.5px] border-white flex gap-1 items-center p-1 iphone:w-[60px] tablet:w-[120px] laptop:w-[180px] imac:w-[180px]">
                  <AuthenIcon className="w-2 h-2 tablet:w-5 tablet:h-5" />
                  {is2FAEnabled ? (
                    <Disable2fa Disable={Disable} />
                  ) : (
                    <Enable2fa />
                  )}
                </div>
                <div onClick={logout} className="flex gap-1 items-center p-1">
                  <LogOutIcon className="w-2 h-2 tablet:w-5 tablet:h-5" />
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(LogoBar);
