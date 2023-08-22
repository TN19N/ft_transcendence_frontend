import p5Types from "p5";
import { scorePair, size } from "./PongTypes";
import { Socket } from "socket.io-client";

const BLUE = 'rgb(255,70,70)';
const RED = 'rgb(0,128,255)';
const NET_CLOLOR = 'white';

export const drowScore = (score: scorePair, size: size, p5?: p5Types) => {
  const textSIze = size.w / 50;
  p5?.fill(RED);
  p5?.textSize(textSIze);
  p5?.textStyle(p5.BOLD);
  p5?.text(score.tp, size.w / 6, size.h / 15);
  p5?.fill(BLUE);
  p5?.textSize(textSIze);
  p5?.textStyle(p5.BOLD);
  p5?.text(score.op, size.w / 1.44, size.h / 15);
}

export function drowNet(size: size, p5?: p5Types) {

  p5?.stroke(NET_CLOLOR)
  if (p5?.drawingContext instanceof CanvasRenderingContext2D) {
    const ctx = p5.drawingContext as CanvasRenderingContext2D;
    ctx.setLineDash([15, 13]);
  }
  p5?.strokeWeight(size.h / 150)
  p5?.line(size.w / 2, 0, size.w / 2, size.h)
  p5?.noStroke()
}

export const keyDown = (socket: Socket, pb: number, display: string, p5?: p5Types) => {

  if (!display) return

  if (p5?.keyIsDown(87) && pb >= 0)
    socket.emit('key-pressed', 'up');
  if (p5?.keyIsDown(83) && pb <= 100)
    socket.emit('key-pressed', 'down');

}

export const displayDelay = (delay: string, size: size, p5?: p5Types) => {
  if (delay === '-') return
  let ss = 3


  let colorVal: string = '#00ff55'

  // const max = 255, min = 90;

  // for (let x = 0; x < 3; x++) {
  //   colorVal.push((Math.floor(Math.random() * (max - min)) + min).toString())
  // }
  if (delay.length > 2)
    ss = 5
  if (delay.length > 10)
    ss = 10
  if (delay === 'You Lost')
    colorVal = '#a60711'
  // p5?.fill(`rgb(${colorVal.shift()},${colorVal.shift()},${colorVal.shift()})`)
  p5?.fill(colorVal)

  p5?.textFont('Roboto Mono')
  p5?.textAlign(p5.CENTER, p5.CENTER)
  p5?.textSize(size.w / ss)
  p5?.text(delay.toString(), size.w / 2, size.h / 2)

}

export const keyDown_test = (p5?: p5Types) => {

  if (p5?.keyIsDown(38)) {
    return 2
  }
  // socket.emit('key-pressed-ball', 'up');
  if (p5?.keyIsDown(40))
    return 1
  // socket.emit('key-pressed-ball', 'down');
  return
}