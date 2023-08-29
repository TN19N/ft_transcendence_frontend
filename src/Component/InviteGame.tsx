import axios from "axios";
import { useState} from "react";
import { useNavigate } from "react-router";
import "./InviteGame.css";
import { socket } from "./UserContext";
import { PlayIcon } from "./Icons";
interface IdInvitor{
    id:string
}

export default function InviteGame({ id }: IdInvitor) {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const Buttons = ["Slow", "Meduim", "Fast"]
  

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
            console.log("Time is done");
        }, 5000);
        const startGameListener = () => {
            console.log("startgame");
          clearTimeout(timeoutId);
          navigate("/play");
        };
        const stopTimerListener = () => {
            console.log("stopTimer");
          clearTimeout(timeoutId);
          socket.once("startGame", startGameListener);
  
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
      <button onClick={handleGameInvite}>
        <PlayIcon className="w-6 h-6" />
      </button>
      {showButtons && (
        <div className="popup-container">
          <div className=" flex flex-col popup-body bg-InboxColor items-center justify-center rounded-xl gap-6">
            <div className="flex gap-3 w-full justify-center ">
              {Buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => sendGameInvite(button)}
                  className="bg-NavBarroundedIcon p-2 rounded-xl"
                >
                  {button}
                </button>
              ))}
            </div>
            <div
              className="items-end cursur-pointer"
              onClick={() => {
                setShowButtons(false);
              }}
            >
              Close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
