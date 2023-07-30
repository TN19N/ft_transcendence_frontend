import { Route, Routes } from 'react-router'
import './App.css'
import Home from './Component/Home'
import LogoBar from './Component/LogoBar'
import Chat from './Component/Chat'
import Background from './Component/Background'
import Login from './Component/Login'
// import LeaderBoard from './Component/LeaderBoard'
// import NavBar from './Component/NavBar'
// import TopScore from './Component/TopScore'

function App() {

  return (
    <div className=''>
      <Background />
    <div className=" flex flex-col items-center align-center gap-4 w-[90%] m-auto bg-background mt-3 overflow-hidden shadow-[rgba(255,_255,_255,_0.19)_0px_20px_20px]">
          <LogoBar />
          {/* <Login /> */}
          <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/Chat" element={<Chat />}  />
          <Route path="/Play" element={<h1 style={{color:'#05AE13'}}>Page Play</h1>}  />
          <Route path="/CreateRoom" element={<h1 style={{color:'#05AE13'}}>Page Create Room</h1>}  />
          <Route path="/Profile" element={<h1 style={{color:'#05AE13'}}>Page Profile</h1>}  />
          <Route path="*" element={<h1 style={{color:'white', fontSize:'25px'}}>404 Page Not Found </h1>}  />
          </Routes>
    </div>
  </div>
  
    );
  }
  
  export default App
  {/* <div className=" flex flex-col items-center align-center gap-4">
    <LogoBar />
    
      <Routes> 
    <Route path="/" element={<Home />} />
    <Route path="/Chat" element={<Chat />}  />
    <Route path="/Play" element={<h1 style={{color:'#05AE13'}}>Page Play</h1>}  />
    <Route path="/CreateRoom" element={<h1 style={{color:'#05AE13'}}>Page Create Room</h1>}  />
    <Route path="/Profile" element={<h1 style={{color:'#05AE13'}}>Page Profile</h1>}  />
    <Route path="*" element={<h1 style={{color:'white', fontSize:'25px'}}>404 Page Not Found </h1>}  />
    </Routes>
    </div> */}
  
  // <div className='flex flex-col flex-1 gap-5 ml-[7%]'>
  //   
  //   <div className='flex  '>
  //     <Home />
  //   </div>
  // </div>