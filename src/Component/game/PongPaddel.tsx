import { paddelPair, Position, size } from "./PongTypes";
import p5Types from "p5"; 
import { scale } from "./PongUtils";

const PADDEL_SCALE = 8;
const PADDLE_MARGING = .5;
const PADDLE_RADIUS = 10;

export default class Paddel {

  private leftPosition: Position;
  private rightPosition: Position;
  private size: size;
  private p5: p5Types;

  public BLUE: string = 'rgb(255,70,70)';
  public RED: string = 'rgb(0,128,255)';

  constructor(p5: p5Types) {
    this.p5 = p5;
    this.leftPosition = {x: 0, y: 0};
    this.rightPosition = {x: 0, y: 0};
    this.size= {w: 0, h: 0};
  }

  show() {
    this.p5.fill(this.BLUE);
    this.p5.rect(this.leftPosition.x, this.leftPosition.y,
          this.size.w, this.size.h, PADDLE_RADIUS);
    this.p5.fill(this.RED);
    this.p5.rect(this.rightPosition.x, this.rightPosition.y,
          this.size.w, this.size.h, PADDLE_RADIUS);
    // console.log(this.rightPosition.x, this.rightPosition.y,
    //       this.size.w, this.size.h);
    // console.log('window: ', window.innerHeight, window.innerWidth);
    }

  update (pos: paddelPair, canvasH: number) {
    const windowH = canvasH - this.size.h;
    this.rightPosition.y = scale(pos.rp , windowH);
    this.leftPosition.y = scale(pos.lp , windowH);
    this.show();
  }

  getPaddelPsition = () => {return {rp: this.rightPosition.y, lp:this.leftPosition.y}}

  resize(pos: Position, minSize: number) {
    this.size.h = scale(minSize, PADDEL_SCALE);
    this.size.w = scale(minSize / PADDEL_SCALE, PADDEL_SCALE);
    const marg  = scale(minSize, PADDLE_MARGING);
    this.leftPosition.x = pos.x * 2 - this.size.w - marg ;
    this.rightPosition.x = this.size.w - marg;
  }

}
