import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { changePassword } from '../api/service/passowrd';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [usser, setUser] = useState({});
  AsyncStorage.getItem('user').then((user) => {
    setUser(JSON.parse(user));
  });
  const handleChangePassword = async () => {
    // Add your logic to handle changing password
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return;
    }

    // Clear error message if passwords match
    setError('');

    const email = user.email;
  
    // Add your API call or logic to change password here
    const result = await changePassword (email,currentPassword,newPassword,confirmPassword);
    if(result){
      alert('Đổi mật khẩu thành công');
      navigation.navigate('welcome');
    }
    else{
      setError('Mật khẩu hiện tại không đúng');
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../images/icon/left-arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Đổi mật khẩu</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu hiện tại"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            onChangeText={setCurrentPassword}
            value={currentPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu mới"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            onChangeText={setNewPassword}
            value={newPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu mới"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 100,
    backgroundColor: '#0895FB',
    paddingHorizontal: 20,
  },
  backIcon: {
    height: 30,
    width: 30,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    width: '90%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#0895FB',
    width: '100%',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    color: '#555',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingVertical: 0,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    width: '50%',
    height: 40,
    backgroundColor: '#0895FB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
