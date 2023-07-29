
import InvitePeople from './InvitePeople';
import TopScore from './TopScore';
const Home = () => {
    return (
    <section className=' flex gap-2  h-[87vh] w-[90%] overflow-hidden'>   
            <InvitePeople/>
            <TopScore/> 
    </section>
    );
}


export default Home;