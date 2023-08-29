import { useParams } from "react-router";
import LogoBar from "./LogoBar";
import Pong from "./game/Pong";
import { useLocation } from "react-router-dom";


const Game = () => {
  const Buttons = ["Slow", "Meduim", "Fast"];
  const location = useLocation().pathname;
  const { id, speed } = useParams();
  return (
    <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-xl w-[90%]">
      <LogoBar />
      <section className="flex gap-2 h-[78vh] w-[90%]  mb-6 m-auto Game items-center justify-center">
        (location === "/" && {Buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => sendGameInvite(button)}
            className="bg-NavBarroundedIcon p-2 rounded-xl"
          >
            {button}
          </button>
        ))})
        <Pong id={userId?.id} speed={"Slow"} />
      </section>
    </div>
  );
};

export default Game;
