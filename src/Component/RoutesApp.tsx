import { Route, Routes } from 'react-router'
import Home from './Home'
import Chat from './Chat'
import Profile from './Profile'
import Authentication from './TwoFactor'
const RoutesApp = () => {
    return (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />}  />
            <Route path="/play" element={<div><h1 style={{color:'#05AE13'}}>Page Play</h1></div>}  />
            <Route path="/createRoom" element={<div><h1 style={{color:'#05AE13'}}>Page Create Room</h1></div>}  />
            <Route path="/profile" element={<Profile />}  />
            <Route path="/authentication" element={<Authentication/>}  />
            <Route path="*" element={<div><h1 style={{color:'white', fontSize:'25px'}}>404 Page Not Found </h1></div>}  />
          </Routes>
    );
}


export default RoutesApp;