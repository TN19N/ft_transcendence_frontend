import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface UserData {
  id: number;
  name: string;
  email: string;
}

export interface UserDataType {
  userData: UserData | null;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserDataType | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    axios.get<UserData[]>('http://localhost/api/auth/intra42')
      .then(response => {
        setUserData(response.data[0]);
        setIsAuthenticated(true);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  return (
    <UserContext.Provider value={{ userData, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider};
