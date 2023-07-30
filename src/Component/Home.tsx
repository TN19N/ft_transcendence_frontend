
import InvitePeople from './InvitePeople';
import TopScore from './TopScore';
const Home = () => {
    return (
    <section className=' flex gap-2  h-[78vh] w-[90%] overflow-hidden mb-6'>   
            <InvitePeople/>
            <TopScore/> 
    </section>
    );
}


export default Home;