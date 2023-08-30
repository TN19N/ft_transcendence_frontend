import  { useState, useEffect, memo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LogoBar from "./LogoBar";
import Pong from "./game/Pong";
import "./Game.css";
const Game = () => {
  const Buttons = ["Slow", "Medium", "Fast"];
  const { id, speed } = useParams<{ id?: string; speed?: string }>();
  const [yourSpeed, setYourSpeed] = useState<string | undefined>(speed);
  const location = useLocation();
  const [draw, setDraw] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChooseSpeed = (selectedSpeed: string) => {
    setYourSpeed(selectedSpeed);
    setDraw(true);
  };

  useEffect(() => {
    console.log("draw:", draw);
  }, [draw, navigate]);
  return (
    <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-xl w-[90%]">
      <LogoBar />
      <section className="flex gap-2 h-[78vh] w-[90%] mb-6 m-auto Game items-center justify-center">
        {location.pathname === "/play/invitor" ? (
          <>{<Pong id="" speed="" />}</>
        ) : !speed && !id ? (
          <>
            {!draw &&
              Buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleChooseSpeed(button);
                  }}
                  className="bg-NavBarroundedIcon p-2 rounded-xl"
                >
                  {button}
                </button>
              ))}
            {console.log("random")}

            {draw && <Pong id="" speed={yourSpeed || ""} />}
          </>
        ) : (
          <>{<Pong id={id || ""} speed={speed || ""} />}</>
        )}
      </section>
    </div>
  );
};

export default memo(Game);
