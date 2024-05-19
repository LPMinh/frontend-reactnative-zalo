import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from '../api/service/login';
import findUserByEmail from '../api/service/user';
import { useDispatch } from 'react-redux';
import { setUser } from '../reduxtoolkit/slice/ChatReducer';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const account = route?.params?.account;
  const dispatch = useDispatch();
  if (account) {
    setEmail(account.email);
    setPassword(account.password);
  }

  const handleLogin = async () => {
    const info = {
        email: email,
        password: password,
        // isMobile: true,
    };
    try {
        const response = await login(info);
        if (response) {
            const user = await findUserByEmail(email);
            dispatch(setUser(user));
            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.navigate('tab');
        }
    } catch (error) {
      setError('Sai tài khoản hoặc mật khẩu');
        console.error('Error during login process:', error);
    }
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../images/icon/left-arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Đăng nhập</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Vui lòng nhập email và mật khẩu để đăng nhập</Text>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('resetpassword1')}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
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
  subtitle: {
    textAlign: 'left',
    marginBottom: 20,
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
  forgotPasswordText: {
    color: '#0895FB',
    marginBottom: 20,
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

export default LoginScreen;
