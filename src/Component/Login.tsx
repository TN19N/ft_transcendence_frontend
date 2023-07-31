import PlayerImg from '../assets/playerIcon.svg'
import { LoginIcon } from './Icons'
import { motion } from 'framer-motion';

const login = () => {
        const firstDivAnimation = {
          hidden: { x: -1200 },
          visible: { x: 0 },
        };
    const secondDivAnimation = {
        hidden: { x: 1200 }, 
        visible: { x: 0 },   
      };
      const handleLoginButtonClick = () => {
        window.location.href = 'http://localhost:9000/api/auth/intra42';
      };
    return (
            <div className='flex gap-8 items-center font-Stick rounded-xl h-[80vh] w-[60%] m-auto'>
                <motion.div
                className='flex-1'
                initial="hidden"
                animate="visible"
                variants={firstDivAnimation}
                transition={{ ease: "easeOut", duration: 2 }}

                >
                <p className='text-white w-[70%] rounded-3xl'>
                    <h1 className='text-4xl font-bold my-4 xsm:text-md '>Play Pong game</h1>
                    <p className='text-xl font-thin my-5 xsm:text-md'>Welcome to the thrilling world of online ping pong,
                        where the virtual table comes alive with intense rallies and lightning-fast reflexes.
                        Engage in epic battles with players from around the globe.</p>
                    <button className='text-white bg-buttonLoginColor rounded-2xl p-2 w-35 text-lg flex gap-2 items-center' onClick={handleLoginButtonClick}><LoginIcon className='w-6 h-6' />Login</button>
                </p>
                </motion.div>
                <motion.div
                className='flex-1'
                initial="hidden"
                animate="visible"
                variants={secondDivAnimation}
                transition={{ ease: "easeOut", duration: 2 }}
                >
                    <img src={PlayerImg} alt="Pong" className='w-[350px] h-[275px]' />

                </motion.div>
               
            </div>
    );
}


export default login;