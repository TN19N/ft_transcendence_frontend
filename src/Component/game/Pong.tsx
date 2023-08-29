import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import MainCanvas from "./PongTable";
import { param } from "./PongTypes"; // Assuming the type is named PongProps
import { useEffect } from "react";
import { Socket, io } from "socket.io-client";

const BACK_END = `${process.env.SERVER_HOST}/game`;

const Pong: React.FC<param> = (prop: param) => {
  const soc: Socket = io(BACK_END, {
    withCredentials: true,
  });
  useEffect(() => {
    return () => {
      soc.emit("dis");
    };
  }, []);

  const mainPong: MainCanvas = new MainCanvas(prop, soc);
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
