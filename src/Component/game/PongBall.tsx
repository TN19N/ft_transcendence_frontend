import { Position } from "./PongTypes";
import p5Types from "p5";
import { mapRange, scale } from "./PongUtils";

const BALL_COLOR = 'yellow'
const BALL_SCALE = 2

export default class Ball {

  public position: Position = { x: 0, y: 0 };
  public color: string = BALL_COLOR;
  private radious: number = 0
  private p5: p5Types;

  constructor(p5: p5Types) {
    this.p5 = p5;
  }

  show() {
    this.p5.fill(this.color);
    this.p5.ellipse(this.position.x, this.position.y, this.radious);
  }

  update(pos: Position, size: number) {
    const x = scale(pos.x, size * 2);
    const y = scale(pos.y, size);
    const r = this.radious / 2;
    this.position.x = mapRange(x, r, size * 2, this.radious, size * 2 - r);
    this.position.y = mapRange(y, r, size, this.radious, size - r);
    this.show();
  }

  resize(r: number) {
    this.radious = scale(r, BALL_SCALE);
  }

}