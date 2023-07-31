import './App.css'
// import { Route, Routes } from 'react-router'
// import Home from './Component/Home'
// import Chat from './Component/Chat'
// import Loader from './Component/Loader'
import LogoBar from './Component/LogoBar'
import Background from './Component/Background'
import Login from './Component/Login'

function App() {

  return (

    <div className='h-[100vh] flex items-center justify-center'>
      <Background />
    <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-lg overflow-hidden xsm:w-[80%] sm:w-[80%] md:w-[90%] 2xl:w-[90%]">
          <LogoBar />
          <Login />
            
    </div>
  </div>

    );
  }
  
  export default App
{/* <Loader />
          <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/Chat" element={<Chat />}  />
          <Route path="/Play" element={<h1 style={{color:'#05AE13'}}>Page Play</h1>}  />
          <Route path="/CreateRoom" element={<h1 style={{color:'#05AE13'}}>Page Create Room</h1>}  />
          <Route path="/Profile" element={<h1 style={{color:'#05AE13'}}>Page Profile</h1>}  />
          <Route path="*" element={<h1 style={{color:'white', fontSize:'25px'}}>404 Page Not Found </h1>}  />
          </Routes> */}