import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

export default async function requestApi(endpoint, method, body, isInterceptors, contenttype = 'application/json', navigation) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": contenttype,
        "Access-Control-Allow-Origin": "*",
        // "User-Agent": "mobile",
    };

    let baseURL = '';
    if (Platform.OS === 'ios') {
        baseURL = "http://127.0.0.1:8080/api/v1";
    } else if (Platform.OS === 'android') {
        baseURL = "http://10.0.2.2:8080/api/v1";
    } else {
        baseURL = "http://localhost:8080/api/v1";
    }


    const instance = axios.create({ headers, baseURL });

    if (isInterceptors) {
        instance.interceptors.request.use(
            async (config) => {
                if (!config.url.includes("/refreshToken")) {
                   const token = await AsyncStorage.getItem('token');
                   if (token) {
                       const tokenRequest = JSON.parse(token);
                       config.headers['Authorization'] = `Bearer ${tokenRequest.accessToken}`;
                   }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalConfig = error.config;
           
                if (error.response && error.response.status === 403) {
                    try {
                        const token = await AsyncStorage.getItem('token');
                        
                        if (token) {
                            if(contenttype == "multipart/form-data"){
                                const tokenRequest = JSON.parse(token);
                                const formData = new FormData();
                                formData.append("refreshToken", tokenRequest.refreshToken);
                                const result = await instance.post(`/auth/refreshToken-formData`, { refreshToken: tokenRequest.refreshToken });
                                const newToken = result.data;
                                await AsyncStorage.setItem('token', JSON.stringify(newToken));
                                originalConfig.headers['Authorization'] = `Bearer ${newToken.accessToken}`;
                                return instance(originalConfig);
                            }else{
                                const tokenRequest = JSON.parse(token);
                                const result = await instance.post(`/auth/refreshToken`, { refreshToken: tokenRequest.refreshToken });
                                const newToken = result.data;
                                await AsyncStorage.setItem('token', JSON.stringify(newToken));
                                originalConfig.headers['Authorization'] = `Bearer ${newToken.accessToken}`;
                                return instance(originalConfig);
                            }
                        }
                    } catch (err) {
                        console.log("err", err);
                        if (err.response && err.response.status === 400) {
                            await AsyncStorage.removeItem('token');
                            await AsyncStorage.removeItem('user');
                            navigation.navigate('login');
                        }
                        return Promise.reject(err);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    return instance.request({
        method: method,
        url: `${endpoint}`,
        data: body,
        responseType: 'json',
    });
}
