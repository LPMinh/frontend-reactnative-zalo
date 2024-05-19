import requestApi from "../request/request";

export const sendMessageText = async (senderId,receiverId,textContent,messageType='TEXT',messageStatus='SENT',hiddenSenderSide) => {
    const formdata = new FormData();
    formdata.append('senderId', senderId);
    formdata.append('receiverId', receiverId);
    formdata.append('textContent', textContent);
    formdata.append('messageType', messageType);
    formdata.append('messageStatus', messageStatus);
    formdata.append('hiddenSenderSide', hiddenSenderSide);
   try{
    const response = await requestApi("/messages/chat", "POST", formdata, true, "multipart/form-data",null);
    return response.data;
    }catch(error){
        console.log(error);
        return Promise.reject(error);
    }
};

export const sendMessageImge = async (senderId,receiverId,fileContent,messageType='IMAGE',messageStatus='SENT',hiddenSenderSide) => {
    const formdata = new FormData();
    formdata.append('fileContent', fileContent);
    formdata.append('senderId', senderId);
    formdata.append('receiverId', receiverId);
    formdata.append('messageType', messageType);
    formdata.append('messageStatus', messageStatus);
    formdata.append('hiddenSenderSide', hiddenSenderSide);
   try{
    const response = await requestApi("/messages/chat", "POST", formdata, true, "multipart/form-data",null);
    return response.data;
    }catch(error){
        console.error("error in send image",error.response.data);
        return Promise.reject(error);
    }
};

export const sendMessageFile = async (senderId,receiverId,fileContent,messageType='FILE',messageStatus='SENT',hiddenSenderSide) => {
    const formdata = new FormData();
    formdata.append('fileContent', fileContent);
    formdata.append('senderId', senderId);
    formdata.append('receiverId', receiverId);
    formdata.append('messageType', messageType);
    formdata.append('messageStatus', messageStatus);
    formdata.append('hiddenSenderSide', hiddenSenderSide);
   try{
    const response = await requestApi("/messages/chat", "POST", formdata, true, "multipart/form-data",null);
    return response.data;
    }catch(error){
        console.error("error in send image",error);
        return Promise.reject(error);
    }
};


export const revokeMessages = async (messageId,receiverId,senderId)=>{
    try{
        const response = await requestApi(`/messages/revokeMessage`, "POST", {messageId,receiverId,senderId}, true, "application/json");
        return response.data;
    }catch(error){
        console.log(error);
        return Promise.reject(error);
    }
}

export const sendMessageVideo = async (senderId,receiverId,fileContent,messageType='VIDEO',messageStatus='SENT',hiddenSenderSide) => {
    const formdata = new FormData();
    formdata.append('fileContent', fileContent);
    formdata.append('senderId', senderId);
    formdata.append('receiverId', receiverId);
    formdata.append('messageType', messageType);
    formdata.append('messageStatus', messageStatus);
    formdata.append('hiddenSenderSide', hiddenSenderSide);
   try{
    const response = await requestApi("/messages/chat", "POST", formdata, true, "multipart/form-data",null);
    return response.data;
    }catch(error){
        console.error("error in send image",error);
        return Promise.reject(error);
    }
}

export const forwardMessage = async (senderId,receiversId,messageId) => {
    try{
        const response = await requestApi(`/messages/forwardMessage`, "POST", {senderId,receiversId,messageId}, true, "application/json");
        return response.data;
    }catch(error){
        console.error("error in forward message",error);
        return Promise.reject(error);
    }
}

export const call = async (senderId, receiverId, messageType) => {
    try {
        const response = await requestApi("/messages/callRequest", "POST", {senderId, receiverId, messageType}, true, "application/json");
        return response.data;
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
}

export const acceptCall = async (messageId) => {
    try {
        const response = await requestApi("/messages/acceptCallRequest/"+messageId, "GET", null, true, "application/json");
        return response.data;
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
}

export const rejectCall = async (messageId) => {
    try {
        const response = await requestApi("/messages/rejectCallRequest/"+messageId, "GET", null, true, "application/json");
        return response.data;
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
}






