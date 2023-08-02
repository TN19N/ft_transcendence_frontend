import axios from 'axios';
import InvitePeople from './InvitePeople';
import TopScore from './TopScore';
import { useEffect, useState } from 'react';
import LogoBar from './LogoBar';
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
        <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden xsm:w-[80%] sm:w-[80%] md:w-[90%] 2xl:w-[90%]">
        <LogoBar />
        <section className=' flex gap-2  h-[78vh] w-[90%] overflow-hidden mb-6'>   
            <InvitePeople/>
            <TopScore/> 
        </section>
        </div>
    );
}


export default Home;