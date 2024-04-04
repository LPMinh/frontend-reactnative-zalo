import requestApi from "../request/request";

const findUserByEmail = async (email) => {
    const response = await requestApi(`/users/email/${email}`, 'GET', null, true, 'application/json')
    .then((response) => {
        console.log(response.data);
        return response.data;
    }).catch((error) => {
        console.error(error);
        return null;
    });
    return response;
}

export default findUserByEmail;