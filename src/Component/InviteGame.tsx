import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./InviteGame.css";
import { socket } from "./UserContext";
import { PlayIcon } from "./Icons";
import { toast } from "react-toastify";
import { errorMsg } from "./Poperror";

interface IdInvitor {
  id: string;
}
export default function InviteGame({ id }: IdInvitor) {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const Buttons = ["Slow", "Medium", "Fast"];

  const handleGameInvite = () => {
    setShowButtons(true);
  };

  const sendGameInvite = (speed: string) => {
    axios
      .post(
        `${process.env.SERVER_HOST}/api/v1/user/sendGameInvite?reciverId=${id}&speed=${speed}`
      )
      .then(() => {
        setShowButtons(false);
        toast.info("Waiting Accept game", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const timeoutId = setTimeout(() => {
          console.log("Time is done");
        }, 5000);
        const startGameListener = () => {
          console.log("startgame");
          clearTimeout(timeoutId);
          navigate("/play/invitor");
        };
        const stopTimerListener = () => {
          console.log("stopTimer");
          clearTimeout(timeoutId);
          socket.once("startGame", startGameListener);
        };
        socket.on("stopTimer", stopTimerListener);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          errorMsg(errorMessage);
        }
      });
  };

  return (
    <div>
      <button onClick={handleGameInvite}>
        <PlayIcon className="w-3 h-3 iphone:w-6 iphone:h-6 tablet:w-8 tablet:h-8 laptop:w-10 laptop:h-10" />
      </button>
      {showButtons && (
        <div className="popup-container ">
          <div className=" flex flex-col popup-body  bg-InboxColor items-center justify-center rounded-xl gap-4 iphone:left-[20%] iphone:w-[60%] tablet:w-[40%] tablet:left-[30%] laptop:left-[35%] laptop:w-[30%]">
            <div className="flex gap-3 w-full justify-center ">
              {Buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => sendGameInvite(button)}
                  className="bg-NavBarroundedIcon p-2 rounded-xl iphone:w-[48px] iphone:text-[8px] tablet:w-[74px] tablet:text-[14px] laptop:w-[84px] laptop:text-[18px]"
                >
                  {button}
                </button>
              ))}
            </div>
            <div
              className="items-end cursor-pointer"
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
