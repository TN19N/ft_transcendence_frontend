import './App.css';
import { useContext } from 'react';
import { Route, Routes } from 'react-router'
import Home from './Component/Home'
import Chat from './Component/Chat'
import LogoBar from './Component/LogoBar'
import Background from './Component/Background'
import Login from './Component/Login'
import Profile from './Component/Profile'
import { UserProvider} from './Component/UserContext'

function App() {
  // const userContext = useContext<UserDataType | null>(UserContext);
   return (
    <UserProvider>
    <div className='h-[100vh] flex items-center justify-center'>
      <Background />
      <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden xsm:w-[80%] sm:w-[80%] md:w-[90%] 2xl:w-[90%]">
      <LogoBar />
    {/* {(userContext?.isAuthenticated) ? ( */}
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/Chat" element={<Chat />}  />
            <Route path="/Play" element={<div><h1 style={{color:'#05AE13'}}>Page Play</h1></div>}  />
            <Route path="/CreateRoom" element={<div><h1 style={{color:'#05AE13'}}>Page Create Room</h1></div>}  />
            <Route path="/Profile" element={<Profile />}  />
            <Route path="*" element={<div><h1 style={{color:'white', fontSize:'25px'}}>404 Page Not Found </h1></div>}  />
          </Routes>
            // ):
            // (<Login />
            // )}
    </div>
  </div>
  </UserProvider>
    );
  }
  
  export default App;