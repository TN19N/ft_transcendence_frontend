import axios from 'axios';
import { useEffect, useState } from 'react'; // Use Navigate instead of navigate
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

  useEffect(() => {
    axios.get('http://localhost/api/user')
      .then((response) => {
        const userData: UserData = response.data;
        setUserData(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log('Userdata',userData);
  return (
        <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden w-[90%]">
        <LogoBar />
        <section className=' flex gap-2  h-[78vh] w-[90%] overflow-hidden mb-6 m-auto'>   
            <InvitePeople/>
            <TopScore/> 
        </section>
        </div>
   
  );
};

export default Home;