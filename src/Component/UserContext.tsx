import React, { createContext, useState, useEffect, ReactNode,} from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

const UserContext = createContext<number | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== '/login') {
      axios.get('http://localhost/api/v1/user', { withCredentials: true })
        .then((response) => {
          setUser(response.data.id);
          console.log('user', response.data);
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            navigate('/login');
            console.log('Unauthorized');
          }
          setUser(null);
        });
    }
  }, [location.pathname]);

  const userContextValue = user;
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};


export { UserProvider, UserContext };
