import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { WebSocketAPI, baseURLWebSocket } from "../../constant/baseURL";
import { Alert } from "react-native";

// Function to establish the WebSocket connection
const socket = new WebSocket(WebSocketAPI);
