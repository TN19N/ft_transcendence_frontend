
import InvitePeople from './InvitePeople';
import TopScore from './TopScore';
const Home = () => {
    return (
    <section className=' flex gap-2  h-[87vh] w-[90%] overflow-hidden shadow-[rgba(255,_255,_255,_0.19)_0px_20px_20px]'>   
            <InvitePeople/>
            <TopScore/> 
    </section>
    );
}


export default Home;