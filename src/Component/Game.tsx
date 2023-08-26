import { useParams } from "react-router";
import LogoBar from "./LogoBar";
import Pong from "./game/Pong";


const Game = () => {
  const {id , speed} = useParams();
    return (
      <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-xl w-[90%]">
        <LogoBar />
        <section className="flex gap-2 h-[78vh] w-[90%]  mb-6 m-auto Game items-center justify-center">
        {(id && speed) ?(<Pong id={id} speed={speed}/>):(<Pong/>)}
        
        </section>
      </div>
    );
  return null;
};

export default Game;
