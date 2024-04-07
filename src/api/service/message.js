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
    const response = await requestApi("/messages/chat", "POST", formdata, null, "multipart/form-data",null);
    return response.data;
    }catch(error){
        console.log(error);
        return Promise.reject(error);
    }
};

export const sendMessageImge = async (senderId,receiverId,fileContent,messageType='IMAGE',messageStatus='SENT',hiddenSenderSide) => {
    const formdata = new FormData();
    console.log("fileContent",fileContent);
    formdata.append('senderId', senderId);
    formdata.append('receiverId', receiverId);
    formdata.append('fileContent', fileContent);
    formdata.append('messageType', messageType);
    formdata.append('messageStatus', messageStatus);
    formdata.append('hiddenSenderSide', hiddenSenderSide);
   try{
    const response = await requestApi("/messages/chat", "POST", formdata, null, "multipart/form-data");
    return response.data;
    }catch(error){
        console.log(error);
        return Promise.reject(error);
    }
};

