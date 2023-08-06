// Use Navigate instead of navigate
import InvitePeople from './InvitePeople';
import LogoBar from './LogoBar';
import TopScore from './TopScore';
import { useContext } from 'react';
import { UserAuthen } from './UserContext';

const Home = () => {
  const isAuthenticated  = useContext(UserAuthen);
  // !isAuthenticated i want to redirect to login page
  if(!isAuthenticated) window.location.replace('/login');
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