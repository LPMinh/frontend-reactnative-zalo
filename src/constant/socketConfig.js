import SockJS from "sockjs-client";
import { over } from "stompjs";
import { baseURLWebSocket } from "./baseURL";


export var stompClient = null;


export const connect = (onConnected, onError) => {
  let sock = new SockJS(baseURLWebSocket);
  stompClient = over(sock);
  stompClient.connect({}, onConnected, onError);
}

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
}