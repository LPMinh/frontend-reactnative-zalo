import AsyncStorage from "@react-native-async-storage/async-storage";
import requestApi from "../request/request";
import findUserByEmail from "./user";

const login = async (info) => {
    try {
        const response = await requestApi('/auth/login', 'POST', info, false, 'application/json');
        const responseData = response.data;
        if (responseData) {
            await AsyncStorage.setItem('token', JSON.stringify(responseData));
            const token = await AsyncStorage.getItem('token');
        }
        return responseData;
    } catch (error) {
        console.error("error in login", error);
       return Promise.reject(error);
    }
};

export default login;