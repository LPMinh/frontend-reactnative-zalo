import requestApi from "../request/request";
import updateload from "./upload";

const register = async (user) => {
    console.log("in register",user);
    const respone = await requestApi('/auth/sendOtp', 'POST',user,false,'application/json')
    .then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
        return null;
    });
    return respone;
}
export default register;