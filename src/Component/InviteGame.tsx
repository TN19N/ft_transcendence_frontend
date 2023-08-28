import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// import { io } from "socket.io-client";
import { socket } from "./UserContext";
interface IdInvitor{
    id:string
}

export default function InviteGame({ id }: IdInvitor) {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  
  

  const handleGameInvite = () => {
    setShowButtons(true);
  };

  const sendGameInvite = (speed: string) => {
    axios
      .post(
        `${process.env.SERVER_HOST}/api/v1/user/sendGameInvite?reciverId=${id}&speed=${speed}`
      )
      .then(() => {
        const timeoutId = setTimeout(() => {
            console.log("Tine is done");
        }, 5000);
        const startGameListener = () => {
            console.log("STart");
          clearTimeout(timeoutId);
          navigate("/play");
        };
        const stopTimerListener = () => {
            console.log("STop");
          clearTimeout(timeoutId);
          socket.once("startGame", startGameListener);
          console.log("Start game");
        };
        socket.on("stopTimer", stopTimerListener);
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login");
        }
      });
  };


  return (
    <div>
      <button onClick={handleGameInvite}>Invite to play</button>
      {showButtons && (
        <div className="flex gap-3">
          <button onClick={() => sendGameInvite("SLOW")}>SLOW</button>
          <button onClick={() => sendGameInvite("MEDIUM")}>MEDIUM</button>
          <button onClick={() => sendGameInvite("FAST")}>FAST</button>
        </div>
      )}
    </div>
  );
}
