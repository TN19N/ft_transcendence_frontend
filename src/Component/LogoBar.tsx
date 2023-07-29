import  { useState } from 'react';
import logo from '../assets/logo.svg';
import Avatar from '../assets/ahmaidi.png';
import { ArrowIcon, AuthenIcon, LogOutIcon, NavProfileIcon } from './Icons';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const LogoBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className=" flex justify-between items-center w-[90%] mt-2">
      <Link to="/">
      <img src={logo} alt="Logo" className="w-16 h-16" />
      </Link>
      <NavBar />
      <div className="relative">
        <div className="flex gap-2 items-center text-white cursor-pointer" onClick={toggleDropdown}>
          <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          <span className="flex items-center gap-2">
            ahmaidi <ArrowIcon className={`w-3 h-2 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
          </span>
        </div>
        {isDropdownOpen && (
          <div className="absolute left-0 text-white rounded w-40 bg-background border-[1px] mt-1">
            <div className="flex flex-col items-start cursor-pointer text-lg">
              <button onClick={() => console.log('Profile clicked!')} className='flex gap-1 items-center p-1'>
                <NavProfileIcon className="w-5 h-5" />Profile
              </button>
              <button className="border-t-[0.5px] border-b-[0.5px] border-white w-full flex gap-1 items-center p-1" onClick={() => console.log('2FA clicked!')}>
                <AuthenIcon className="w-5 h-5" />Authentication
              </button>
              <button onClick={() => console.log('Logout clicked!')} className='flex gap-1 items-center p-1'>
                <LogOutIcon className="w-5 h-5" />Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoBar;




// import logo from '../assets/logo.svg'
// import Avatar from '../assets/ahmaidi.png'
// import { ArrowIcon } from './Icons'
// const LogoBar = () => {
//     return (
//         <div className='ml-[10%] flex justify-between w-[85%]'>
//             <img src={logo} alt="Logo" className='w-16 h-16' />
//             <div className='flex gap-4 items-center text-white'>
//                 <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />ahmaidi <ArrowIcon className='w-2 h-2' />
//             </div>
//         </div>
//     );
// }


// export default LogoBar;