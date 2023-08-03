import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate instead of navigate
import InvitePeople from './InvitePeople';
import LogoBar from './LogoBar';
import TopScore from './TopScore';
interface UserData {
  id: number;
  name: string;
  email: string;
}

const Home = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user data from the API endpoint
    axios.get('http://localhost/api/user')
      .then((response) => {
        const userData: UserData = response.data;
        setUserData(userData);
        setIsAuthenticated(true); // Assuming the API response indicates authentication status
      })
      .catch((error) => {
        console.error(error);
        setIsAuthenticated(false);
      });
  }, []);
  console.log('Userdata',userData);
  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden xsm:w-[80%] sm:w-[80%] md:w-[90%] 2xl:w-[90%]">
        <LogoBar />
        <section className=' flex gap-2  h-[78vh] w-[90%] overflow-hidden mb-6'>   
            <InvitePeople/>
            <TopScore/> 
        </section>
        </div>
      ) : (
        <Navigate to="/login" replace /> // Use Navigate component for redirection
      )}
    </>
  );
};

export default Home;