import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { resetPassword, sendOTPResetPassword } from '../api/service/passowrd';
import { tr } from 'react-native-paper-dates';

const ResetPasswordForm = ({navigation}) => {
  const [email, setEmail] = useState('');
 const [error, setError] = useState('');
  const handleResetPassword = async () => {
    const response = await sendOTPResetPassword(email);
    if(response){
      navigation.navigate('OTPVerifyResetPassword', {email: email});
    } else {
      setError('Email không tồn tại');
    }

  }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{ width: "100%", height: 100, textAlignVertical: "center" }}>
            <Image
              source={require("../images/icon/left-arrow.png")}
              style={{ height: 30, width: 30 }}></Image>
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlignVertical: "center",
            fontSize: 14,
            color: "white",
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: "20px",
            
          }}>
         
        </Text>
      </View>
      <Text style={styles.title}>Khôi phục mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email của bạn"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
        {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf:'center',
    width: "100%",
    height: "10%",
    backgroundColor: "#0895FB",
  }
});
export default ResetPasswordForm;
