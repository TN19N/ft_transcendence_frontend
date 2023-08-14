import LogoBar from './LogoBar'
import Inbox from './Inbox'
import Chat_box from './Chat_box'
import FriendsOnline from './FriendsOnline'
const Chat = () => {
    return (
      <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden w-[90%]">
        <LogoBar />
        <section className='flex gap-1 w-[90%] mb-6 m-auto'>
          <div className='flex-1'>
            <Inbox />
          </div>
          <div className='flex-[2] bar-chat h-[78vh] iphone:hidden tablet:block'>
            <Chat_box />
          </div>
          <div className='flex-1 bar-chat iphone:hidden laptop:block'>
            <FriendsOnline />
          </div>
      </section>
      </div>
    );
}

export default Chat;