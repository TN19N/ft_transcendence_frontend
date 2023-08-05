import  { useState } from 'react';
import { NotificationIcon } from './Icons'
export default function Notification() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
      };    
  return (
    <div className='relative cursor-pointer' onClick={toggleDropdown}>
        <NotificationIcon className="iphone:w-3 iphone:h-3 tablet:w-5 tablet:h-5 laptop:w-8 laptop:h-8"/>
        <div>
            {isDropdownOpen && (
                <div className="absolute text-white rounded w-40 bg-background border-[1px] mt-2">
                  <div className="flex flex-col items-start cursor-pointer text-lg">
                    <div onClick={() => console.log('request clicked!')}>
                      
                    </div>
                  </div>
                </div>
              )}
        </div>
    </div>
  )
}
