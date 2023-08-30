import { Socket } from "socket.io-client";
import Ball from "./PongBall";
import Paddel from "./PongPaddel";
import p5Types from "p5";
import { displayDelay, drowNet, drowScore, keyDown } from "./PongTable-func";
import { Position, param, paddelPair, scorePair, size } from "./PongTypes";
import isEqual from "lodash/isEqual";

const FPS = 60;
const BG_COLOR = "#002B71";

export default class MainCanvas {
  private p5?: p5Types;
  private ball?: Ball;
  private paddel?: Paddel;
  // private ui?: Ui;
  private size: size;
  private score: scorePair;
  private ballPosition: Position;
  private paddelPosition: paddelPair;
  private socket: Socket;
  private delay: string;
  private updates: {
    bp: Position;
    pp: paddelPair;
    score: scorePair;
    size: size;
    windowReSized: size;
    zoom: number;
    delay: string;
  };

  constructor(prop: param, soc: Socket) {
    this.score = { tp: "", op: "" };
    this.size = { w: 50, h: 100 };
    this.delay = "-";
    this.ballPosition = { x: 50, y: 50 };
    this.paddelPosition = { rp: 50, lp: 50 };
    this.updates = {
      bp: { x: 0, y: 0 },
      pp: { rp: 0, lp: 0 },
      score: { tp: "", op: "" },
      size: { w: 50, h: 100 },
      windowReSized: { w: 500, h: 500 },
      zoom: window.devicePixelRatio,
      delay: "-",
    };
    this.socket = soc;
    if (prop.id && prop.speed) {
      const data = {
        id: prop.id,
        speed: prop.speed,
      };
      this.socket.emit("start", data);
      this.delay = "Wait Please...";
    } else if (!prop.id && prop.speed) {
      this.socket.emit("start");
      this.socket.emit("game-speed", prop.speed);
    } else {
      this.socket.emit("start");
    }
    this.socketHandler();
  }

  init(p5: p5Types, canvasRef: Element) {
    this.p5 = p5;
    this.ball = new Ball(p5);
    this.paddel = new Paddel(p5);
    // if (!this.invite) this.ui = new Ui(p5, canvasRef, this.size, this.socket);
    this.resize();
    p5.createCanvas(this.size.w, this.size.h).parent(canvasRef);
    p5.frameRate(FPS);
  }

  update() {
    if (this.cheakForUpdates()) this.mainGameDisplay();
    keyDown(this.socket, this.paddelPosition.rp, this.delay, this.p5);
  }

  mainGameDisplay() {
    this.p5?.background(BG_COLOR);
    drowNet(this.size, this.p5);
    this.ball?.update(this.ballPosition, this.size.h);
    this.paddel?.update(this.paddelPosition, this.size.h);
    drowScore(this.score, this.size, this.p5);
    displayDelay(this.delay, this.size, this.p5);
  }

  cheakForUpdates() {
    let res: boolean = false;
    if (this.updates.zoom !== window.devicePixelRatio) {
      this.updates.zoom = window.devicePixelRatio;
      this.resize();
      res = true;
    }
    if (!isEqual(this.updates.pp, this.paddelPosition)) {
      Object.assign(this.updates.pp, this.paddelPosition);
      res = true;
    }
    if (!isEqual(this.updates.bp, this.ballPosition)) {
      Object.assign(this.updates.bp, this.ballPosition);
      res = true;
    }
    if (!isEqual(this.updates.score, this.score)) {
      Object.assign(this.updates.score, this.score);
      res = true;
    }
    if (!isEqual(this.updates.size, this.size)) {
      Object.assign(this.updates.size, this.size);
      res = true;
    }
    if (
      !isEqual(this.updates.windowReSized, {
        w: window.innerWidth,
        h: window.innerHeight,
      })
    ) {
      Object.assign(this.updates.windowReSized, {
        w: window.innerWidth,
        h: window.innerHeight,
      });
      this.resize();
      res = true;
    }
    if (!(this.delay === this.updates.delay)) {
      this.updates.delay = this.delay;
      res = true;
    }
    return res;
  }

  // TODO: zoom is not handeled
  resize() {
    let size = Math.min(window.innerHeight, window.innerWidth);
    if (size === window.innerWidth) {
      size = size * 0.8;
    }
    this.size = { w: size, h: size / 1.4 };
    this.p5?.resizeCanvas(this.size.w, this.size.h);
    this.ball?.resize(this.size.w);
    this.paddel?.resize(
      { x: this.size.w / 2, y: this.size.h / 2 },
      this.size.w
    );
    // if (!this.invite) this.ui?.resize(this.size);
  }

  socketHandler() {
    this.socket.on("delay", (delay) => {
      // console.log('-> ', delay)
      this.delay = delay;
    });

    this.socket.on("start-game", (data) => {
      this.score.op = data.p1 + ": ";
      this.score.tp = data.p2 + ": ";
    });

    this.socket.on("next-frame", (data) => {
      this.ballPosition.x = data.x;
      this.ballPosition.y = data.y;
    });

    this.socket.on("new-score", (data) => {
      // console.log('game started.');
      this.score.op = data.other;
      this.score.tp = data.this;
    });

    this.socket.on("my-position", (data) => {
      this.paddelPosition.rp = data;
      // console.log('data: ', data);
    });

    this.socket.on("player-position", (data) => {
      // console.log('data: ', data);
      this.paddelPosition.lp = data;
    });
  }
}
