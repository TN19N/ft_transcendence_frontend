import { useParams } from "react-router";
import LogoBar from "./LogoBar";
import Pong from "./game/Pong";
import { useLocation } from "react-router-dom";

const Game = () => {
  const Buttons = ["Slow", "Medium", "Fast"];
  const location = useLocation().pathname;
  const { id, speed } = useParams<{ id?: string; speed?: string }>();

  return (
    <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-xl w-[90%]">
      <LogoBar />
      <section className="flex gap-2 h-[78vh] w-[90%]  mb-6 m-auto Game items-center justify-center">
        {location === "/" &&
          Buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => {
                // Handle button click here
              }}
              className="bg-NavBar roundedIcon p-2 rounded-xl"
            >
              {button}
            </button>
          ))}
        <Pong id={id || ""} speed={speed || ""} />{" "}
        {/* Use empty string as default */}
      </section>
    </div>
  );
};

export default Game;
