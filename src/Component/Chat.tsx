
import Inbox from './Inbox'
import Chat_box from './Chat_box'
import ChatFriends from './ChatFriends'
const Chat = () => {
    return (
        <section className=' flex gap-1 h-[78vh] w-[90%] mb-8 overflow-hidden'>
          <Inbox />
          <div className=' bar-chat  w-[50%]'>
            <Chat_box />
          </div>
          <div className='bar-chat  w-[25%]'>
            <ChatFriends />
          </div>
      </section>
    );
}

export default Chat;