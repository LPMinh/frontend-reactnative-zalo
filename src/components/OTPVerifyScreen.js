
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import verifyEmail from "../api/service/verify_email";
import register from "../api/service/register";

export default function OTPVerify({ navigation, route}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isDisable, setIsDisable] = useState(true);
  const [error, setError] = useState("");
  const inputs = [];
  const  user  = route.params.user;
  const email = user.email;
  console.log(user);
  const handleOtpInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Focus vào ô kế tiếp khi nhập
    if (value !== "" && index < 5) {
      inputs[index + 1].focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && index > 0 && otp[index] === "") {
      // Focus vào ô trước đó khi nhấn Backspace và ô hiện tại trống
      inputs[index - 1].focus();
    }
  };
  useEffect(() => {
    let isDisable = false;
    for (let i = 0; i < otp.length; i++) {
      if (otp[i] === "") {
        isDisable = true;
        break;
      }
    }
    setIsDisable(isDisable);
  }, [otp]);

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");
    try{
      const response = await verifyEmail(email, otpCode);
      console.log(response.toString());
      if(response === 'valid'){
        alert('Đăng ký thành công')
        navigation.navigate('login')
      }else if(response === 'invalid'){
        setError('Mã OTP không đúng')
      } else if(response === 'expired'){
        setError('Mã OTP đã hết hạn')
      }else{
        setError('Đã có lỗi xảy ra')
      }
    }catch(error){
      // console.log(error);
    }

  }

  const handleResendOTP = async () => {
    try {
      const response = await register(user);
      console.log(response);
      if (response) {
        setError("");
        setOtp(["", "", "", "", "", ""]);
        alert("Đã gửi lại mã OTP");
      }
    } catch (e) {
      console.log(e);
      setError("Đã có lỗi xảy ra");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              height: "100%",
              textAlignVertical: "center",
            }}>
            <Image
              source={require("../images/icon/left-arrow.png")}
              style={{ height: 20, width: 20, resizeMode: "contain" }}
            />
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            color: "white",
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: 20,
            height: "100%",
            textAlignVertical: "center",
          }}>
          Đăng Ký
        </Text>
      </View>
      <View style={styles.content}>
        <Text
          style={{
            fontSize: 14,
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
          }}>
          OTP
        </Text>
        <Image
          source={require("../images/icon/otp.png")}
          style={{
            height: 250,
            width: "70%",
            marginTop: 20,
            resizeMode: "contain",
          }}></Image>
        <Text
          style={{
            fontSize: 14,
            color: "black",
            fontWeight: "500",
            textAlign: "center",
            marginTop: 20,
          }}>
          Nhập OTP bạn nhận được tại:
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
          }}>
          {email}
        </Text>
        <View
          style={{
            width: "100%",
            justifyContent: "space-evenly",
            height: "30%",
          }}>
          <View style={[styles.containerotp]}>
        
            {otp.map((value, index) => (
              <TextInput
                key={index.toString()}
                style={styles.input}
                value={value}
                onChangeText={(text) => handleOtpInputChange(index, text)}
                keyboardType="numeric"
                maxLength={1}
                autoFocus={index === 0 ? true : false}
                ref={(input) => (inputs[index] = input)}
                onKeyPress={({ nativeEvent: { key } }) =>
                  handleKeyPress(index, key)
                }
              />
            ))}
          </View>
          <Text
            style={{
              width: "100%",
              color: "red",
              fontSize: 13,
              fontWeight: "bold",
              textAlign: "center",
            }}>
           {error}
          </Text>
          <TouchableOpacity
            style={[styles.button, isDisable && styles.disabledButton]} onPress={handleVerifyOTP}>
            <Text
              style={{
                backgroundColor: "#0895FB",
                color: "white",
                textAlign: "center",
                width: "100%",
                height: 40,
                lineHeight: 40,
                borderRadius: 5,
              }}>
              Xác nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.button_resend]} onPress={handleResendOTP}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                width: "100%",
                height: 40,
                lineHeight: 40,
                borderRadius: 5,
              }}>
              Gửi lại
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  containerotp: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    marginHorizontal: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "10%",
    backgroundColor: "#0895FB",
  },
  content: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: "90%",
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: "#ccc", // Màu nhạt khi bị disabled
  },
  button: {
    width: "50%",
    alignSelf: "center",
    marginTop: "10px",
  },
  button_resend: {
    backgroundColor: "#FDCB13", // Màu vàng
  },
});
