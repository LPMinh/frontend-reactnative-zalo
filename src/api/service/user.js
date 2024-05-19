import requestApi from "../request/request";

const findUserByEmail = async (email) => {
    try {
        const response = await requestApi('/users/email/'+email,'GET',null,true,'application/json');
        return response.data;
    } catch (error) {
        console.error("Error in find user by email", email, error);
        Promise.reject(error);
        return null;
    }
};

export default findUserByEmail;
