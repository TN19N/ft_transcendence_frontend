import { useState, useEffect } from "react";
import { NotificationIcon } from "./Icons";
import { socket, useUserContext } from "./UserContext";
import Notify from "./Notify";
import { Notification } from "./UserContext";

const NotificationComponent = () => {
  const userId = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>(
    userId?.notifications ?? []
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const removeNotification = (notificationToRemove: Notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification !== notificationToRemove
      )
    );
  };
  useEffect(() => {
    const handleNotification = (notification: any) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    };
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
      socket.disconnect(true);
    };
  }, [notifications]);

  return (
    <div className="relative cursor-pointer">
      <button className="flex items-center" onClick={toggleDropdown}>
        <NotificationIcon className="w-2 h-2 iphone:w-3 iphone:h-3 tablet:w-5 tablet:h-5 laptop:w-7 laptop:h-7" />
        <div className="absolute flex iphone:left-[5px] iphone:w-3 iphone:h-3 iphone:text-[8px] iphone:top-[-5px] tablet:left-[10px] tablet:top-[-9px] tablet:w-5 tablet:h-5 tablet:text-[12px] laptop:left-[13px] laptop:top-[-9px] laptop:w-6 laptop:h-6 laptop:text-[14px] rounded-full bg-blue-500 text-white  items-center justify-center ">
          <span>{notifications.length}</span>
        </div>
      </button>
      {isDropdownOpen && (
        <div className="absolute text-white rounded iphone:w-[150px] tablet:w-[206px] laptop:w-[272px] bg-background border-[1px] rounded-xl mt-2 right-0 min-h-[20px]">
          <div className="flex flex-col cursor-pointer">
            {notifications.length ? (
              notifications.map((notification, index) => (
                <div key={`${index}`}>
                  <Notify
                    notification={notification}
                    removeNotification={removeNotification}
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
  );
};
export default NotificationComponent;
