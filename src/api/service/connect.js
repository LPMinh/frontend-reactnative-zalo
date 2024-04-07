import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export const connect = (onConnected, onError) => {
    AsyncStorage.getItem("user").then((userData) => {
        const user= JSON.parse(userData);
        let sock = new SockJS('http://localhost:8080/ws');
        const stompClient = over(sock);
        stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/'+user.email+'/queue/friend-request', function (message) {
           Alert.alert("Friend Request",message.body);
    
        });
        onConnected(frame);
        }, onError);
    });
}