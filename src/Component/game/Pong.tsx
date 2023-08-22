import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import MainCanvas from "./PongTable";
import { inviteProp } from "./PongTypes"; // Assuming the type is named PongProps

const BACK_END = `${process.env.SERVER_HOST}/game`;

const Pong: React.FC<inviteProp> = (invite: inviteProp) => {
  const mainPong: MainCanvas = new MainCanvas(BACK_END, invite);

  const setup = (p5: p5Types, canvasParentRef: Element) => 
    mainPong.init(p5, canvasParentRef);

  const draw = () => mainPong.update();

  return (
    <>
      <Sketch setup={setup} draw={draw} />
    </>
  );
};

export default Pong;
