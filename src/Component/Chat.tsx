import logo from '../assets/logo.svg'
import Inbox from './Inbox'
import Chat_box from './Chat_box'
import ChatFriends from './ChatFriends'
import Avatar from '../assets/ahmaidi.png'
import { ArrowIcon } from './Icons'
const Chat = () => {
    return (
        <section className=' flex flex-col items-start gap-6 p-8 h-screen 2xl:container 2xl:mx-auto'>
        <div className='ml-[10%] flex justify-between w-[85%]'>
          
          <img src={logo} alt="Logo" className='w-20 h-20' />
          <div className='flex gap-4 items-center text-white'>
            <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />ahmaidi <ArrowIcon className='w-2 h-2' />
          </div>
        </div>
        <div className='flex gap-1 items-center  bg-red-500 rounded-xl ml-[10%]'>
          <Inbox />
          <div className=' bar-chat  w-[50%]'>
            <Chat_box />
          </div>
          <div className='bar-chat  w-[25%]'>
            <ChatFriends />
          </div>
        </div>
  
      </section>
    );
}

export default Chat;