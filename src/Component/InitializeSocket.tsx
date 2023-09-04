import { io, Socket } from "socket.io-client";
import {errorMsg} from"./Poperror"
let socketInstance: Socket | null = null;

export const initializeSocket = () => {
  if (!socketInstance) {
    socketInstance = io(`${process.env.SERVER_HOST}/user`);
    socketInstance.on("error", errorMsg);
  }
};

export const getSocket = (): Socket | null => {
  return socketInstance;
};
