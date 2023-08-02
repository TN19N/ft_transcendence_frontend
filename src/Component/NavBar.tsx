import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NavCreatRoomIcon, NavHomeIcon, NavPlayIcon, NavProfileIcon, ChatIcon } from "./Icons";

const NavBar = () => {
  const location = useLocation().pathname;
  const [activeButton, setActiveButton] = useState<string>('');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    const currentPath = location.substring(1);
    setActiveButton(currentPath);
  }, [location]);

  return (
      <div className='flex items-center justify-between bg-InboxColor rounded-xl w-[30%] p-2'>
        <button
          className={`rounded-full w-[10%] h-[10%] p-1 ${activeButton === 'Play' ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('Play')}
        >
          <NavLink to="/play">
            <div className="flex items-center justify-center">
              <NavPlayIcon className="w-7 h-7" />
            </div>
          </NavLink>
        </button>
        <button
          className={`rounded-full w-[10%] h-[10%] p-1 ${activeButton === 'Chat' ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('Chat')}
        >
          <Link to="/chat">
            <div className="flex items-center justify-center">
              <ChatIcon className="w-7 h-7" />
            </div>
          </Link>
        </button>
        <button
          className={`rounded-full w-[10%] h-[10%] p-1 ${activeButton === '' ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('/')}
        >
          <Link to="">
          <div className="flex items-center justify-center">
            <NavHomeIcon className="w-7 h-7" />
          </div>
          </Link>
        </button>
        <button
          className={`rounded-full w-[10%] h-[10%] p-1 ${activeButton === 'CreateRoom' ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('CreateRoom')}
        >
          <Link to="/createRoom">
          <div className="flex items-center justify-center">
            <NavCreatRoomIcon className="w-8 h-8" />
          </div>
          </Link>
        </button>
        <button
          className={`rounded-full w-[10%] h-[10%] p-1 ${activeButton === 'Profile' ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('Profile')}
        >
          <Link to="/profile">
          <div className="flex items-center justify-center">
            <NavProfileIcon className="w-8 h-8" />
          </div>
          </Link>
        </button>
      </div>
  );
};

export default NavBar;