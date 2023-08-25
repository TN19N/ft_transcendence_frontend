import { Route, Routes } from 'react-router'
import Home from './Home'
import Chat from './Chat'
import Profile from './Profile'
import Authentication from './TwoFactor'
import Check2fa from './Check2fa'
import Login from './Login'
import EditProfile from './EditProfile'
import Game from './Game'


const RoutesApp = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/2fa" element={<Check2fa />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/play" element={<Game />} />
      <Route path="/game/:id?/:speed?" element={<Game/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/enable2fa" element={<Authentication />} />
      <Route path={"/editprofile"} element={<EditProfile />} />
      <Route
        path="*"
        element={
          <div>
            <h1 style={{ color: "white", fontSize: "25px" }}>
              404 Page Not Found{" "}
            </h1>
          </div>
        }
      />
    </Routes>
  );
  }


export default RoutesApp;