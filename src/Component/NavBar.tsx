import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NavCreatRoomIcon, NavHomeIcon, NavPlayIcon, NavProfileIcon, ChatIcon } from "./Icons";
import { useUserContext } from "./UserContext";

const NavBar = () => {
  const userId = useUserContext();
  const location = useLocation().pathname;
  const [activeButton, setActiveButton] = useState<string>('');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    const currentPath = location;
    setActiveButton(currentPath);
  }, [location]);
  return (
      <div className='flex items-center justify-between bg-InboxColor rounded-xl w-[40%] p-[3px] iphone:w-[45%] tablet:w-[40%] tablet:p-[5px]'>
        <button
          className={`rounded-full p-1 ${activeButton === '/play' ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('Play')}
        >
          <NavLink to="/play">
            <div className="flex items-center justify-center">
              <NavPlayIcon className="w-2 h-2 iphone:w-3 iphone:h-3 tablet:w-5 tablet:h-5 laptop:w-7 laptop:h-7" />
            </div>
          </NavLink>
        </button>
        <button
          className={`rounded-full  p-1 ${activeButton === '/chat' ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('Chat')}
        >
          <Link to="/chat">
            <div className="flex items-center justify-center">
              <ChatIcon className="w-2 h-2 iphone:w-3 iphone:h-3 tablet:w-5 tablet:h-5 laptop:w-7 laptop:h-7" />
            </div>
          </Link>
        </button>
        <button
          className={`rounded-full  p-1 ${(activeButton === '/home' || activeButton === '/') ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('home')}
        >
          <Link to="/home">
          <div className="flex items-center justify-center">
            <NavHomeIcon className="w-2 h-2 iphone:w-3 iphone:h-3 tablet:w-5 tablet:h-5 laptop:w-7 laptop:h-7" />
          </div>
          </Link>
        </button>
        <button
          className={`rounded-full p-1 ${activeButton === '/createRoom' ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('CreateRoom')}
        >
          <Link to="/createRoom">
          <div className="flex items-center justify-center">
            <NavCreatRoomIcon className="w-2 h-2 iphone:w-3 iphone:h-3 tablet:w-5 tablet:h-5 laptop:w-7 laptop:h-7" />
          </div>
          </Link>
        </button>
        <button
          className={`rounded-full  p-1 ${activeButton === '/profile' ? 'bg-NavBarroundedIcon' : 'bg-transparent'}`}
          onClick={() => handleButtonClick('Profile')}
        >
          <Link to= {`/profile/${userId}`}>
          <div className="flex items-center justify-center">
            <NavProfileIcon className="w-2 h-2 iphone:w-3 iphone:h-3 tablet:w-5 tablet:h-5 laptop:w-7 laptop:h-7" />
          </div>
          </Link>
        </button>
      </div>
  );
};

export default NavBar;