import requestApi from "../request/request";


const updateuser = async (email,dob,gender,avatar,name) => {
    const response = await requestApi(`/users/updateUser`, 'PUT', {email,dob,gender,avatar,name}, true, 'application/json',null)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
        return null;
    });
    console.log(response);
    return response;
}
export default updateuser;