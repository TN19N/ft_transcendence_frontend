import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosError } from 'axios'; // Import AxiosError for error type
import Loader from './Loader';

export interface UserData {
  id: number;
}

interface UserContextValue {
  user: UserData | null;
}

const UserContext = createContext<UserContextValue | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

  const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  useEffect(() => {
    if (location.pathname !== '/login') {
      axios.get('http://localhost/api/user', { withCredentials: true })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error: AxiosError) => { // Use AxiosError to define the error type
          if (error.response?.status === 401) {
            window.location.href = '/login';
            console.log('Unauthorized');
          }
          setUser(null);
        })
    }
  }, [location.pathname]);

  setTimeout(() => {
    return(<Loader/>);
  }, 1000);

  const userContextValue: UserContextValue = {
    user: user,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
