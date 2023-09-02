import { Route, Routes } from "react-router";
import Home from "./Home";
import Chat from "./Chat";
import Profile from "./Profile";
import Authentication from "./TwoFactor";
import Handle2fa from "./Handle2fa";
import Login from "./Login";
import EditProfile from "./EditProfile";
import Game from "./Game";
import { useUserContext } from "./UserContext";

const RoutesApp = () => {
  const userId = useUserContext();
  return (
    <Routes>
      {!userId?.id ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/2fa" element={<Handle2fa />} />
        </>
      ) : (
        <>
        //Create Socket function here
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/play">
            <Route index element={<Game />} />
            <Route path=":id?/:speed?" element={<Game />} />
            <Route path="invitor" element={<Game />} />
          </Route>
          <Route path="/profile">
            <Route index element={<Profile />} />
            <Route path=":id" element={<Profile />} />
          </Route>
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
        </>
      )}
    </Routes>
  );
};

export default RoutesApp;

/* <Route path="/play" element={<Game />} />
          <Route path="/play/:id?/:speed?" element={<Game />} />
          <Route path="/play/invitor" element={<Game />} /> */