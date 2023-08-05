import LogoBar from './LogoBar'
import Inbox from './Inbox'
import Chat_box from './Chat_box'
import ChatFriends from './ChatFriends'
const Chat = () => {
    return (
      <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden w-[90%]">
        <LogoBar />
        <section className='flex gap-1 h-[78vh] w-[90%] mb-6 overflow-hidden m-auto'>
          <div className='flex-1 h-[30vh]'>
            <Inbox />
          </div>
          <div className='flex-2 bar-chat h-[60vh] w-[50%] iphone:hidden tablet:block'>
            <Chat_box />
          </div>
          <div className='flex-1 bar-chat  w-[25%] iphone:hidden'>
            <ChatFriends />
          </div>
      </section>
      </div>
    );
}

export default Chat;