import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Loader from './Loader';

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserContextValue {
  isAuthenticated: boolean;
  user: UserData | null;
}

const UserContext = createContext<UserContextValue | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/sample', { withCredentials: true })
      .then((response) => {
        if (response.data.isAuthenticated !== undefined) {
          console.log('Object 1', response.data);
          setIsAuthenticated(response.data.isAuthenticated);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null); 
        }
      })
      .catch((error) => {
        console.error('Error getting user preferences:', error);
        setIsAuthenticated(false);
        setUser(null);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  if (loading) {
    return (<Loader/>);
  }

  const userContextValue: UserContextValue = {
    isAuthenticated: isAuthenticated === null ? false : isAuthenticated,
    user: user,
  };
  console.log('Object 2', userContextValue?.isAuthenticated, userContextValue?.user);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
