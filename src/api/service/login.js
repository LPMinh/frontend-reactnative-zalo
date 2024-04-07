import AsyncStorage from "@react-native-async-storage/async-storage";
import requestApi from "../request/request";

const login = async (info) => {
    const respone = await requestApi('/auth/login', 'POST', info, false, 'application/json')
        .then((response) => {
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        });
    if (respone) {
        AsyncStorage.setItem('token', JSON.stringify(respone));

        AsyncStorage.getItem('token').then((token) => {
            console.log("sau khi lay token", token);
        });
    }
    return respone;

}

export default login;