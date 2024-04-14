import AsyncStorage from "@react-native-async-storage/async-storage";

// Hàm lấy token từ AsyncStorage
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('token is :', token);
        return token;
    } catch (error) {
        console.error(error);
        return null;
    }
};

import requestApi from "../request/request.js";
const fetchData = async () => {
    try {
        const list_rooms = await requestApi('/rooms/all/hellouser@gmail.com', 'GET', [], true)
        console.log(list_rooms);
        return list_rooms.data
        // const token = await getToken(); // Lấy token từ AsyncStorage hoặc nơi lưu trữ token

        // const response = await fetch('/api/v1/rooms/all/hellouser@gmail.com', {
        //     headers: {
        //         Authorization: `Bearer ${token}` // Thêm token vào tiêu đề Authorization
        //     }
        // });
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        // const data = await response.json();
        // console.log(data);
        // return data;
    } catch (error) {
        console.error(error);
    }
};

export default fetchData;

// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8080/api/v1'; // Cấu hình baseURL của Axios

// axios.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// const fetchData = async () => {
//     try {
//       const response = await axios.get('/rooms/all/660933fb221b3e5727c8f89a');
//       // Xử lý dữ liệu nhận được từ API
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       // Xử lý lỗi nếu có
//       console.error(error);
//     }
//   };





