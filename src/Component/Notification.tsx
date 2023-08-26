import { useState, useEffect } from "react";
import { NotificationIcon } from "./Icons";
import { socket, useUserContext } from "./UserContext";
import Notify from "./Notify";
import { Notification } from "./UserContext";

export default function NotificationComponent() {
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
        {...notification,
          payload: {
            ...notification.payload,
            id: notification.payload.senderId,
            senderId: undefined,
          }
        },
      ]);
    };

    socket.on("notification", handleNotification);
   
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [notifications]);

  return (
    <div className="relative cursor-pointer">
      <button className="flex items-center" onClick={toggleDropdown}>
        <NotificationIcon className="w-8 h-8" />
        <div className="absolute left-[15px] top-[-5px] w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[12px]">
          <span>{notifications.length}</span>
        </div>
      </button>
      {isDropdownOpen && (
        <div className="absolute text-white rounded w-72 bg-background border-[1px] rounded-xl mt-2 right-0 min-h-[20px]">
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
}
