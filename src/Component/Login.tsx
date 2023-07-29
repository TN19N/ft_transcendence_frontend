import PlayerImg from '../assets/playerIcon.svg'
import { LoginIcon } from './Icons'

const login = () => {
    return (
        <section className=' flex flex-col items-start gap-6 p-8 h-screen 2xl:container 2xl:mx-auto'>
            <div className='flex gap-8 items-center mt-[8rem] font-Stick rounded-xl ml-[15%]'>
                <p className='w-[400px]  text-white p-8 h-80 rounded-3xl'>
                    <span className='text-4xl font-bold'>Play Pong game</span> <br /><br />
                    <span className='text-xl font-thin'>Welcome to the thrilling world of online ping pong,
                        where the virtual table comes alive with intense rallies and lightning-fast reflexes.
                        Engage in epic battles with players from around the globe.</span> <br /><br />
                    <button className='text-white bg-buttonLoginColor rounded-2xl p-2 w-35 text-lg flex gap-2'><LoginIcon className='w-6 h-6' />Login</button>
                </p>
                <img src={PlayerImg} alt="Pong" className='w-90 h-80' />
            </div>

        </section>
    );
}


export default login;