import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import MainCanvas from "./PongTable";
import { param } from "./PongTypes"; // Assuming the type is named PongProps
import { useEffect, memo } from "react";
import { Socket, io } from "socket.io-client";
import { errorMsg } from "../Poperror";

const BACK_END = `${process.env.SERVER_HOST}/game`;

const Pong: React.FC<param> = (prop: param) => {
  const soc: Socket = io(BACK_END, {
    withCredentials: true,
  });

  useEffect(() => {
    soc.on("error", errorMsg);
    return () => {
      soc.disconnect();
    };
  }, [soc]);

  const mainPong: MainCanvas = new MainCanvas(prop, soc);
  const setup = (p5: p5Types, canvasParentRef: Element) => mainPong.init(p5, canvasParentRef);

  const draw = () => mainPong.update();
  const windowResized = () => mainPong.resize();

  const random = Math.random();
  return (
    <> 
      <Sketch key={random} setup={setup} draw={draw} windowResized={windowResized} />
    </>
  );
};

export default memo(Pong);
