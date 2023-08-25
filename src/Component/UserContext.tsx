import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

interface Notification {
  speed: string | undefined;
  type: string;
  id: string;
  name: string;
}

interface UserContextType {
  id: number | null;
  notifications: Notification[];
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == "401")
      
    return Promise.reject(error);
  }
);
const socket = io(`${process.env.SERVER_HOST}/user`);
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextType | null>({
    id: null,
    notifications: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/2fa"
      ) {
        try {
          const response = await axios.get(
            `${process.env.SERVER_HOST}/api/v1/user`,
            { withCredentials: true }
          );

          const friendResponse = await axios.get(
            `${process.env.SERVER_HOST}/api/v1/user/friendRequest/received`,
            { withCredentials: true }
            );
          const friendReq = friendResponse.data.map((item: any) => ({
            type: "friend",
            id: item.id,
            name: item.name,
          }));

          const groupResponse = await axios.get(
            `${process.env.SERVER_HOST}/api/v1/user/group/invites`,
            { withCredentials: true }
          );
          const groupReq = groupResponse.data.map((item: any) => ({
            type: "group",
            id: item.id,
            name: item.name,
          }));

          setUser({
            id: response.data.id,
            notifications: [...friendReq, ...groupReq],
          });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            navigate("/login");
          }
          setUser(null);
        }
      }
    };
    fetchData();
  }, []);
  
  const userContextValue: UserContextType | null = user;
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = (): UserContextType | null => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext, socket };
