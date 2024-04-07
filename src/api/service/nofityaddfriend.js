import requestApi from "../request/request";

export const getAllRequestAddFriendByReciverId = async (receiverId) => {
    try {
        console.log(receiverId);
        const response = await requestApi("/friends/get-friend-request/"+receiverId, "POST", null , true, "application/json");
        console.log(response.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const acceptRequest = async (senderId, receiverId) => {
    try {
        const response = await requestApi("/friends/accept", "POST", {senderId, receiverId}, true, "application/json");
        console.log(response.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const rejectRequest = async (senderId, receiverId) => {
    try {
        const response = await requestApi("/friends/reject", "POST", {senderId, receiverId}, true, "application/json");
        console.log(response.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}