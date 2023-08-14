import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext<number | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<number | null>(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      if (!initialFetchDone && (window.location.pathname !== '/login' && window.location.pathname !== '/2fa')) {
        try {
          const response = await axios.get(`${process.env.SERVER_HOST}/api/v1/user`, { withCredentials: true });
          setUser(response.data.id);
          console.log('user', response.data);
        } catch (error) {
          console.log('/login');
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log('Unauthorized');
            navigate('/login'); 
          }
          setUser(null);
        }
        setInitialFetchDone(true);
      }
    };
  
    fetchUser();
  }, [initialFetchDone, navigate]);

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
