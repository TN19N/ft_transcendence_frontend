import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorMsg } from "./Poperror";

export interface Notification {
  type: string;
  payload: {
    id: string;
    name?: string;
    speed?: string;
  };
}

interface UserContextType {
  id: number | null;
  notifications: Notification[] | null;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}



const socket = io(`${process.env.SERVER_HOST}/user`);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextType | null>({
    id: null,
    notifications: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("error", errorMsg);
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
            type: "FRIEND_REQUEST",
            payload: {
              id: item.id,
              name: item.name,
            },
          }));

          const groupResponse = await axios.get(
            `${process.env.SERVER_HOST}/api/v1/user/group/invites`,
            { withCredentials: true }
          );
          const groupReq = groupResponse.data.map((item: any) => ({
            type: "GROUP_INVITE",
            payload: {
              id: item.id,
              name: item.name,
            },
          }));

          setUser({
            id: response.data.id,
            notifications: [...friendReq, ...groupReq],
          });
        } catch (error:any) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            navigate("/login");
          } else {
            const errorMessage =
              error.response?.data?.message || "An error occurred";
              errorMsg(errorMessage);
          }
          setUser(null);
        }
      }
    };
    fetchData();
  }, [navigate]);
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

