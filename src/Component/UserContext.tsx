import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface UserData {
  id: number;
}

const UserAuthen = createContext<boolean | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    axios.get<UserData[]>('http://localhost/api/user')
      .then(response => {
        console.log(response.data);
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <UserAuthen.Provider value={isAuthenticated}>
      {children}
    </UserAuthen.Provider>
  );
};

export { UserAuthen, UserProvider };

