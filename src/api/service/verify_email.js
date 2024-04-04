import requestApi from "../request/request";

const verifyEmail = async (email, otp) => {
  const response = await requestApi(
    "/auth/verifyOtp",
    "POST",
    { email: email, otp: otp },
    null,
    "application/json",
    null
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 400) {
        return error.response.data;
      }
    });
    
    return response;
};
export default verifyEmail;
