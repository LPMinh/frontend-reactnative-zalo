import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default async function requestApi(endpoint, method, body, isInterceptors, contenttype='application/json', navigation) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": contenttype,
        "Access-Control-Allow-Origin": "*",
    };
    const instance = axios.create({ headers, baseURL: "http://10.0.2.2:8080/api/v1" });
    // const instance = axios.create({ headers, baseURL: "http://localhost:8080/api/v1" });

    if (isInterceptors) {
        instance.interceptors.request.use(
            async (config) => {
                if (!config.url.includes("/refreshToken")) {
                    try {
                        const token = await AsyncStorage.getItem('token');
                        if (token) {
                            const tokenRequest = JSON.parse(token);
                            config.headers['Authorization'] = `Bearer ${tokenRequest.accessToken}`;
                        }
                    } catch (error) {
                        return Promise.reject(error);
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
                console.log("Access token expired");
                if (error.response && error.response.status === 403) {
                    try {
                        const token = await AsyncStorage.getItem('token');
                        if (token) {
                            const tokenRequest = JSON.parse(token);
                            const result = await instance.post(`/auth/refreshToken`, { refreshToken: tokenRequest.refreshToken });
                            const newToken = result.data;
                            console.log("newToken", newToken);
                            await AsyncStorage.setItem('token', JSON.stringify(newToken));
                            originalConfig.headers['Authorization'] = `Bearer ${newToken.accessToken}`;
                            return instance(originalConfig);
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
