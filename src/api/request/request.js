import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { baseURLApi } from "../../constant/baseURL";

export default async function requestApi(endpoint, method, body, isInterceptors, contenttype = 'application/json', navigation) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": contenttype,
        "Access-Control-Allow-Origin": "*",
    };

    let baseURL = baseURLApi;

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
                console.log("Error in request interceptor", error);
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
                            const tokenRequest = JSON.parse(token);
                            const result = await instance.post(`/auth/refreshToken`, { refreshToken: tokenRequest.refreshToken });
                            const newToken = result.data;
                            await AsyncStorage.setItem('token', JSON.stringify(newToken));
                            originalConfig.headers['Authorization'] = `Bearer ${newToken.accessToken}`;
                            return instance(originalConfig);
                        }
                    } catch (err) {
                        console.log("Error in response interceptor", err);
                        if (err.response && err.response.status === 400) {
                            await AsyncStorage.removeItem('token');
                            await AsyncStorage.removeItem('user');
                            if (navigation) {
                                navigation.navigate('login');
                            }
                        }
                        return Promise.reject(err);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    try {
        return await instance.request({
            method: method,
            url: `${endpoint}`,
            data: body,
            responseType: 'json',
        });
    } catch (error) {
        console.log("Error in requestApi", error);
        throw error;
    }
}
