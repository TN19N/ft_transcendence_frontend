import p5Types from "p5";
import { size } from "./PongTypes";
import { Socket } from "socket.io-client";

export default class Ui {
  private p5: p5Types;
  private speed: string[];
  private buttons: p5Types.Element[];
  private size: size
  private canvasRef: Element;
  private socket: Socket;

  constructor(p5: p5Types, canvasRef: Element, size: size, socket: Socket) {
    this.p5 = p5;
    this.socket = socket;
    this.canvasRef = canvasRef;
    this.speed = ['Slow', 'Medium', 'Fast'];
    this.buttons = [];
    this.size = { w: size.w, h: size.h };
    this.resize(size);
    this.show();
  }

  show() {

    const btSize: size = {
      w: (this.size.w / 2),
      h: (this.size.w / 2),
    }

    let i = -(this.size.w / 4)
    for (const key of this.speed) {
      const button = this.p5.createButton(key)
      this.buttons.push(button)
      button.position(btSize.w + i, (btSize.h / 2) - this.size.h / 30)
      i += this.size.w / 5
      button.size(this.size.w / 10, this.size.h / 15)
      if (this.canvasRef)
        // button clicked
        button.parent(this.canvasRef);
      button.mousePressed(() => {
        this.socket.emit('game-speed', key)
        this.buttons.forEach(button => button.remove());
      })
    }
  }

  resize(size: size) {
    const btSize: size = {
      w: (size.w / 2),
      h: (size.w / 2),
    }
    let i = -(size.w / 4)
    this.buttons.forEach((item) => {
      item.position(btSize.w + i, (btSize.h / 2) - size.h / 30)
      i += size.w / 5
      item.size(size.w / 10, size.h / 15)

      item.style('border', 'none');
      item.style('border-radius', '10em');
      item.style('background', '#32a852');
      item.style('font-size', (size.h / 35).toString() + 'px');
      item.style('color', '#ffffff');
      item.style('font-family', 'inherit');
      item.style('font-weight', '500');
    })
  }



}