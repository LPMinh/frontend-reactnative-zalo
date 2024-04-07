// import requestApi from "../request/request.js";
// const fetchDataUserByID = async (email) => {
//     try {
//         if (!email) {
//             throw new Error("Email không được để trống");
//         }
//         const userByID = await requestApi('/users/email/' + email + '', 'GET', [], true)
//         console.log("userByID :", userByID);
//         return userByID.data

//     } catch (error) {
//         console.error(error);
//     }
// };


// export default fetchDataUserByID;

import requestApi from "../request/request.js";

const fetchDataUserByID = async (email) => {
    try {
        // Kiểm tra xem email có khác rỗng không
        if (!email) {
            throw new Error("Email không được để trống");
        }


        // Xây dựng điểm cuối đúng cách
        const endpoint = '/users/email/' + encodeURIComponent(email);
        console.log('endpoint :', endpoint)
        // Gửi yêu cầu API
        const userResponse = await requestApi(endpoint, 'GET', [], true);

        // Kiểm tra nếu userResponse chứa thuộc tính data
        if (userResponse && userResponse.data) {
            console.log("userByID :", userResponse.data);
            return userResponse.data;
        } else {
            throw new Error("Phản hồi từ máy chủ không hợp lệ");
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        throw error; // ném lại lỗi để hàm gọi (trong trường hợp này là hàm `getData`) có thể xử lý nó một cách chính xác
    }
};

export default fetchDataUserByID;
