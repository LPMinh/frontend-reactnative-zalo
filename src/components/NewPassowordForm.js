import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { resetPassword } from '../api/service/passowrd';
import { err } from 'react-native-svg';

const NewPasswordForm = ({navigation,route}) => {
  const [password, setPassword] = useState({});
  const [confirmPassword, setConfirmPassword] = useState({});
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [disable, setDisable] = useState(true);
 const email = route.params.email;
   const otp = route.params.otp;




const validatePassword = (password) => {
    if(password === ''){
        setPasswordError({error: 'Mật hẩu không được để trống', status: false});
    }
    else if(password.length < 6){
        setPasswordError({error: 'Mật khẩu phải có ít nhất 6 ký tự', status: false});
    }
    else{
        setPasswordError({error: '', status: true});
    }
};

const validateConfirmPassword = (confirmPassword) => {
    if(confirmPassword === ''){
        setConfirmPasswordError({error: 'Mật khẩu không được để trống', status: false});
    }
    else if(confirmPassword !== password){
        setConfirmPasswordError({error: 'Mật khẩu không khớp', status: false});
    }
    else{
        setConfirmPasswordError({error: '', status: true});
    }
};

useEffect(() => {
    if(passwordError.status && confirmPasswordError.status){
        setDisable(false);
    }
    else{
        setDisable(true);
    }
}, [emailError, passwordError, confirmPasswordError]);



  const handleResetPassword = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    if (email === '' ){
      setEmailError('Email không được để trống');
      return;
    }
    if (password === '') {
      setPasswordError('Mật khẩu không được để trống');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (confirmPassword === '') {
      setConfirmPasswordError('Mật khẩu không được để trống');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp');
      return;
    }


    try {
        console.log(email, otp, password, confirmPassword)
      const response = await resetPassword(email, otp, password, confirmPassword);
      
      if (response === true) {
        Alert.alert('Success', 'Mật khẩu đã được thay đổi bạn có thể đăng nhập lại');
        navigation.navigate('login');
      } else {
        Alert.alert('Error', 'khôi phục mật khẩu thất bại');
      }
    } catch (error) {
      Alert.alert('Error', 'Khôi phục mật khẩu thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo lại mật khẩu</Text>
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          editable={false}
         
        />
      </View>
      
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faLock} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setPasswordError('');
          }}
          onBlur={() => {
            validatePassword(password);
            validateConfirmPassword(confirmPassword);
          }}
        />
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError.error}</Text> : null}
      
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faLock} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            setConfirmPasswordError('');
          }}
          onBlur={() => {
            validateConfirmPassword(confirmPassword);
          }}
        />
      </View>
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError.error}</Text> : null}
      
      <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={disable}>
        <Text style={styles.buttonText}>Tạo lại mật khẩu</Text>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    color: '#555',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default NewPasswordForm;
