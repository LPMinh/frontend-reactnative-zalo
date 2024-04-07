import { ca } from "react-native-paper-dates";
import requestApi from "../request/request";

export const getMessages = async (roomId,senderId) => {
   try{
    const response = await requestApi(`/messages/${roomId}?senderId=${senderId}`, 'GET', null, true, 'application/json');
      
    return response.data;
   }catch(error){
       return Promise.reject(error);
   }

 
}

