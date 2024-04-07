import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCalendarDay,
  faPhone,
  faShield,
  faTransgender,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import * as ImagePicker from "expo-image-picker";
import updateload from "../api/service/upload";
import register from "../api/service/register";

export default function FormRegister({ navigation }) {
  const [isDisable, setIsDisable] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [gender, setGender] = useState(true); // Giá trị mặc định
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [validPassword, setValidPassword] = useState({
    valid: false,
    message: "",
  });
  const [validRePassword, setValidRePassword] = useState({
    valid: false,
    message: "",
  });
  const [validPhone, setValidPhone] = useState({ valid: false, message: "" });
  const [validName, setValidName] = useState({ valid: false, message: "" });
  const [validEmail, setValidEmail] = useState({ valid: false, message: "" });

  const checkPhone = (phone) => {
    const regex = /^0[0-9]{9}$/;
    if (phone.length > 0 && regex.test(phone)) {
      setValidPhone({ valid: true, message: "" });
    } else {
      setValidPhone({
        valid: false,
        message: "Số điện thoại phải bắt đầu bằng 0 và gồm 10 chữ số",
      });
    }
  };
  const checkEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    3;
    if (email.length > 0 && regex.test(email)) {
      setValidEmail({ valid: true, message: "" });
    } else {
      setValidEmail({ valid: false, message: "Email không hợp lệ" });
    }
  };
  const checkName = (name) => {
    if (name.length == 0) {
      setValidName({ valid: false, message: "bắt buộc nhập tên" });
    } else {
      setValidName({ valid: true, message: "" });
    }
  };
  const checkPassword = (password) => {
    if (password.length == 0 || password == null) {
      setValidPassword({ valid: false, message: "bắt buộc nhập mật khẩu" });
    } else if (password.length < 6) {
      setValidPassword({
        valid: false,
        message: "mật khẩu phải có tối thiểu 6 chữ số",
      });
    } else {
      setValidPassword({ valid: true, message: "" });
    }
  };

  const checkRepassword = () => {
    if (rePassword !== password) {
      setValidRePassword({
        valid: false,
        message: "mật khẩu không trùng khớp",
      });
    } else {
      setValidRePassword({ valid: true, message: "" });
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };
  //check emty input
  useEffect(() => {
    if (
      name.length === 0 ||
      password.length === 0 ||
      rePassword.length === 0 ||
      email.length === 0
    ) {
      setIsDisable(true);
    } else if (!validName.valid || !validPassword.valid || !validRePassword.valid || !validEmail.valid) {
      setIsDisable(false);
    } else {
      setIsDisable(false);
    }
  }, [phone, name, password, rePassword, email]);

  const handleRegister = async () => {
    checkName(name);
    checkPassword(password);
    checkRepassword(rePassword);
    if (image == null) {
      image = require("../images/icon/avatar.jpg");
    }
    if (
      validName.valid &&
      validPassword.valid &&
      validRePassword.valid
    ) {
      const fileName = await updateload(image);

      const user = {
        name: name,
        phoneNumber: phone,
        gender: gender,
        password: password,
        dateOfBirth: date,
        avatar: fileName,
        email: email,
      };
      const result = await register(user);
      if (result) {
        navigation.navigate("otpverify", { user: user });
      } else {
        alert("Đăng ký thất bại");
      }
    } else {
      alert("Vui lòng nhập đúng thông tin");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../images/icon/left-arrow.png")}
            style={{ height: 10, width: 10 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            color: "white",
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: 20,
          }}>
          Đăng Ký
        </Text>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ width: "100%" }}>
          <Text style={{ width: "100%", textAlign: "center" }}>
            Thêm ảnh đại diện
          </Text>
          <TouchableOpacity
            style={{
              padding: 2,
              alignSelf: "center",
              borderWidth: 1,
              borderRadius: 50,
            }}
            onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : (
              <Image
                source={require("../images/icon/camera.png")}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderRadius: 50,
                  borderWidth: 1,
                }}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              justifyContent: "space-evenly",
              height: "80%",
            }}>
            <View style={styles.inputContainer}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#0895FB", fontSize: 20 }}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="Nhập họ và tên"
                  style={{ width: "100%", height: "100%" }}
                  onChangeText={setName}
                  value={name}
                  onBlur={() => checkName(name)}
                />
                {validName.message && (
                  <Text style={styles.error}>{validName.message}</Text>
                )}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#0895FB", fontSize: 20 }}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="Nhập email"
                  style={{ width: "100%", height: "100%" }}
                  onChangeText={setEmail}
                  value={email}
                  onBlur={() => checkEmail(email)}
                />
                {validEmail.message && (
                  <Text style={styles.error}>{validEmail.message}</Text>
                )}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <FontAwesomeIcon
                icon={faCalendarDay}
                style={{ color: "#0895FB", fontSize: 20 }}
              />
              <TouchableOpacity
                onPress={showDatePicker}
                style={{
                  marginLeft: 10,
                  backgroundColor: "#0895FB",
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text style={{ color: "white" }}>Chọn ngày sinh</Text>
              </TouchableOpacity>
              {showPicker && (
                <RNDateTimePicker
                  mode="datetime"
                  value={date}
                  display="spinner"
                  onChange={onChange}
                  onTouchCancel={hideDatePicker}
                  onTouchEnd={hideDatePicker}
                />
              )}
              <Text
                style={{
                  width: "30%",
                  height: "100%",
                  textAlignVertical: "center",
                  marginLeft: 10,
                }}>
                {date.toDateString()}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <FontAwesomeIcon
                icon={faTransgender}
                style={{ color: "#0895FB", fontSize: 20 }}
              />
              <RadioButtonGroup
                containerStyle={{ flexDirection: "row", marginLeft: 10 }}
                selected={gender}
                onSelected={(value) => setGender(value)}
                radioBackground="green">
                <RadioButtonItem value={true} label="Nữ" />
                <RadioButtonItem
                  value={false}
                  label={<Text style={{ color: "red" }}>Nam</Text>}
                />
              </RadioButtonGroup>
            </View>
            <View style={styles.inputContainer}>
              <FontAwesomeIcon
                icon={faShield}
                style={{ color: "#0895FB", fontSize: 20 }}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="Mật khẩu"
                  secureTextEntry={true}
                  style={{ width: "100%", height: "100%" }}
                  onChangeText={setPassword}
                  value={password}
                  onBlur={() => checkPassword(password)}
                />
                <Text style={styles.error}>{validPassword.message}</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <FontAwesomeIcon
                icon={faShield}
                style={{ color: "#0895FB", fontSize: 20 }}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="Nhập lại mật khẩu"
                  secureTextEntry={true}
                  style={{ width: "100%", height: "100%" }}
                  onChangeText={setRePassword}
                  value={rePassword}
                  onBlur={() => checkRepassword(rePassword, password)}

                />
                <Text style={styles.error}>{validRePassword.message}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity
        style={[styles.button, isDisable && styles.disabledButton]}
        disabled={isDisable}
        onPress={() => {
          handleRegister();
        }}>
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
          Đăng Ký
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#0895FB",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {
    flex: 1,
    width: "90%",
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    height: 50,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#0895FB",
    width: "100%",
    marginLeft: 10,
    height: 40,
  },
  button: {
    width: "50%",
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: "#ccc", // Màu nhạt khi bị disabled
  },
  radioButtonContainer: {
    flexDirection: "row", // Display radio button and label horizontally
    alignItems: "center", // Center items vertically
    marginRight: 20, // Add some space between radio buttons
    display: "flex",
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  radioButtonSelected: {
    backgroundColor: "#009688",
  },
  radioButtonText: {
    color: "#009688",
    fontSize: 16,
  },
  radioButtonTextSelected: {
    color: "white",
  },
  error: {
    color: "red",
    width: "100%",

  },
});
