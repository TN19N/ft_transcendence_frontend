import  { useState, useEffect } from "react";
import { NotificationIcon } from "./Icons";
import { socket, useUserContext } from "./UserContext";
import Notify from "./Notify";

export default function Notification() {
  const userId = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(
    userId?.notifications || []
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    socket.on("notification", (notification: any) => {
      console.log("==>> notification: ", notification);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div className="relative cursor-pointer" onClick={toggleDropdown}>
      <NotificationIcon className="iphone:w-4 iphone:h-4 tablet:w-6 tablet:h-6 laptop:w-8 laptop:h-8" />
      <div>
        {isDropdownOpen && (
          <div className="absolute text-white rounded iphone:w-[150px] tablet:w-[202px] laptop:w-[272px] bg-background border-[1px] rounded-xl mt-2 right-0 min-h-[20px]">
            <div className="flex flex-col  cursor-pointer">
              {notifications.length ? (
                notifications.map((notification) => (
                  <div key={notification.id}>
                    <Notify
                      idSender={notification.id}
                      type={notification.type}
                      name={notification.name}
                    />
                  </div>
                ))
              ) : (
                <span className="m-2">Notifications are empty</span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="absolute iphone:left-[7px] tablet:left-[12px] laptop:left-[15px] top-[-5px] iphone:w-3 iphone:h-3 tablet:w-4 tablet:h-4 laptop:w-6 laptop:h-6 rounded-full bg-blue-500 text-white flex items-center justify-center iphone:text-[8px] table:text-[10px] laptop:text-[12px]">
        <span>{notifications.length}</span>
      </div>
    </div>
  );
}
