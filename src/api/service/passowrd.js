import requestApi from "../request/request";

const sendOTPResetPassword = async (email) => {
  const response = await requestApi(
    "/auth/sendOtpResetPassword",
    "POST",
    { email: email },
    false,
    "application/json",
    null
  )
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error when send OTP reset password");
      }
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
    console.log(response);  
    return response;
};

const verifyOTPResetPassword = async (email, otp) => {
  const response = await requestApi(
    "/auth/validOtp",
    "POST",
    { email: email, otp: otp },
    false,
    "application/json",
    null
  )
    .then((response) => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch((error) => {
      return false;
    });

    console.log(response);

  return response;
};

const resetPassword = async (email, otp,newPassword,confirmNewPassword) => {
  const response = await requestApi(
    "/auth/resetPassword",
    "POST",
    { email: email, otp: otp, newPassword: newPassword, confirmNewPassword: confirmNewPassword },
    false,
    "application/json",
    null
  )
    .then((response) => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return response;
};
const changePassword = async (email, oldPassword,newPassword,confirmNewPassword) => {
  const response = await requestApi(
    "/users/changePassword",
    "POST",
    { email: email, oldPassword: oldPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword },
    true,
    "application/json",
    null
  )
    .then((response) => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return response;
};

export { sendOTPResetPassword, verifyOTPResetPassword, resetPassword,changePassword};
