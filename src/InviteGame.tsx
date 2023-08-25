import { useEffect } from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";

interface Player {
  id: string;
  speed: string;
}
export default function InviteGame({id, speed}:Player) {
  const socketGame = io(`${process.env.SERVER_HOST}/user`);
  const navigate = useNavigate();
  console.log(speed, id);
  const handleGameInvite = () => {};
  useEffect(()=>{
    setTimeout(() => {
      socketGame.disconnect();
    }, 5000);
    socketGame.on("startGmae",()=>{
        navigate("/game");
    });
  },[]);
    
  
  return (
    <div>
      <button onClick={handleGameInvite}>invite to play</button>
      <button></button>
    </div>
  );
}
