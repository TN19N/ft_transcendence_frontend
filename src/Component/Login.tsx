import PlayerImg from '../assets/playerIcon.svg'
import { LoginIcon } from './Icons'
import { motion } from 'framer-motion';

const login = () => {
        const firstDivAnimation = {
          hidden: { x: -1200 },
          visible: { x: 0 },    // End position, move to the original position
        };
    const secondDivAnimation = {
        hidden: { x: 1200 },  // Start position, outside the right side of the screen
        visible: { x: 0 },    // End position, move to the original position
      };
    return (
            <div className='flex gap-8 items-center font-Stick rounded-xl h-[80vh]'>
                <motion.div
                initial="hidden"
                animate="visible"
                variants={firstDivAnimation}
                transition={{ ease: "easeOut", duration: 2 }}

                >
                <p className='w-[400px]  text-white p-8 h-80 rounded-3xl'>
                    <span className='text-4xl font-bold'>Play Pong game</span> <br /><br />
                    <span className='text-xl font-thin'>Welcome to the thrilling world of online ping pong,
                        where the virtual table comes alive with intense rallies and lightning-fast reflexes.
                        Engage in epic battles with players from around the globe.</span> <br /><br />
                    <button className='text-white bg-buttonLoginColor rounded-2xl p-2 w-35 text-lg flex gap-2'><LoginIcon className='w-6 h-6' />Login</button>
                </p>
                </motion.div>
                <motion.div
                initial="hidden"
                animate="visible"
                variants={secondDivAnimation}
                transition={{ ease: "easeOut", duration: 2 }}
                >
                    <img src={PlayerImg} alt="Pong" className='w-90 h-80' />
                </motion.div>
               
            </div>
    );
}


export default login;