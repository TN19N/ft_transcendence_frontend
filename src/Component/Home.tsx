import axios from 'axios';
import InvitePeople from './InvitePeople';
import TopScore from './TopScore';
import { useEffect, useState } from 'react';
// import { UserContext, UserDataType } from './UserContext';
interface UserData {
    id: number;
    name: string;
    email: string;
  }
  
  export interface UserDataType {
    userData: UserData | null;
    isAuthenticated: boolean;
  }
  
const Home = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    axios.get<UserData[]>('http://localhost/api/user')
      .then(response => {
        setUserData(response.data[0]);
        setIsAuthenticated(true);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

    console.log(userData + ' ' + isAuthenticated);
    return (
    <section className=' flex gap-2  h-[78vh] w-[90%] overflow-hidden mb-6'>   
            <InvitePeople/>
            <TopScore/> 
    </section>
    );
}


export default Home;