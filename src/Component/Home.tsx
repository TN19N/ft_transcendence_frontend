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
  const [error, setError] = useState<string | null>(null);
  console.log('userData');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost/api/user', {
          method: "GET",
        });
        console.log('userData');
        console.log('Res: ' + response.status);

        if (!response.ok) {
          // Handle HTTP error status
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        // Handle any other errors
        setError("Error fetching user data");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
    return (
        <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden xsm:w-[80%] sm:w-[80%] md:w-[90%] 2xl:w-[90%]">
        {/* <LogoBar /> */}
        <section className=' flex gap-2  h-[78vh] w-[90%] overflow-hidden mb-6'>   
            {/* <InvitePeople/> */}
            <TopScore/> 
        </section>
        </div>
    );
}


export default Home;