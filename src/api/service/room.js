import requestApi from "../request/request";

export const getRooms = async (email) => {
    const response = await requestApi(`/rooms/all/${email}`, 'GET', null, true, 'application/json')
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error(error.response.data);
            return null;
        });
    return response;
}

export const getRoom = async (roomId) => {
    console.log('roomId',roomId);
    const response = await requestApi(`/rooms/${roomId}`, 'GET', null, true, 'application/json')
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error(error.response.data);
            return null;
        });
    return response;
}