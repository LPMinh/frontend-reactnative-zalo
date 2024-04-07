import requestApi from "../request/request";

export const getRooms = async (email) => {

    const response = await requestApi(`/rooms/all/${email}`, 'GET', null, true, 'application/json')
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error(error);
            return null;
        });
    return response;
}