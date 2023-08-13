import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
const UserContext = createContext<number | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<number | null>(null);
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      if (location.pathname !== '/login') {
        try {
          const response = await axios.get('http://localhost/api/v1/user', { withCredentials: true });
          setUser(response.data.id);
          console.log('user', response.data);
        } catch (error) {
          console.log('/login');
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log('Unauthorized');
           Navigate('/login');
          }
          setUser(null);
        }
      }
    };
  
    fetchUser();
  }, []);

  const userContextValue = user;
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
