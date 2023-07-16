import './App.css'
import Inbox from './Component/Inbox'
import Chat_box from './Component/Chat_box'
import ChatFriends from './Component/ChatFriends'
function App() {

  return (
    <main className=' flex justify-between gap-2 p-8 h-screen 2xl:container 2xl:mx-auto'>
      <Inbox />
      <div className=' bar-chat  w-[50%]'>
        <Chat_box />
      </div>
      <div className='bar-chat  w-[25%]'>
        <ChatFriends />
      </div>

    </main>
  )
}

export default App
