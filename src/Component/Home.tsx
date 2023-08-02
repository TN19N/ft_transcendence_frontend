import InvitePeople from './InvitePeople';
import TopScore from './TopScore';
import { useContext } from 'react';
import { UserContext, UserDataType } from './UserContext';
const Home = () => {
    const userContext = useContext<UserDataType | null>(UserContext);
    console.log(userContext);
    return (
    <section className=' flex gap-2  h-[78vh] w-[90%] overflow-hidden mb-6'>   
            <InvitePeople/>
            <TopScore/> 
    </section>
    );
}


export default Home;