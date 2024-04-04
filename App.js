import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTab from './src/components/BottomTab';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import BoxChatScreen from './src/components/BoxChatScreen';
import ChatScreen from './src/components/ChatScreen';
import { Provider } from 'react-redux';
import store from './src/reduxtoolkit/store/store';
import WelcomeScreen from './src/components/WelcomeScreen';
import LoginScreen from './src/components/LoginScreen';
import AccountAndSecurity from './src/components/AccountAndSecurity';
import UpdatePassword from './src/components/UpdatePassword';

import OTPVerify from './src/components/OTPVerifyScreen';
import FormRegister from './src/components/FormRegisterScreen';
import ResetPasswordForm from './src/components/ResetPasswordEmail';
import OTPVerifyResetPassword from './src/components/OTPVerifyResetPassword';
import NewPasswordForm from './src/components/NewPassowordForm';
import ChangePasswordScreen from './src/components/ChangePasswordForm';
import ProfileDisplay from './src/components/DetailMyProfile';
import UpdateInfomation from './src/components/UpdateInfomation';


export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>


           <Stack.Screen name="welcome" component={WelcomeScreen} />
          <Stack.Screen name='resetpassword1' component={ResetPasswordForm}/>
          <Stack.Screen name = 'newpassword' component={NewPasswordForm}/>
          <Stack.Screen name='OTPVerifyResetPassword' component={OTPVerifyResetPassword}/>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name='register' component={FormRegister}/>
          <Stack.Screen name="otpverify" component={OTPVerify} /> 
          <Stack.Screen name="tab" component={BottomTab} />
          <Stack.Screen name="chat" component={ChatScreen} />
          <Stack.Screen name="chatbox" component={BoxChatScreen} />
          <Stack.Screen name="AccountAndSecurity" component={AccountAndSecurity} />
          <Stack.Screen name="UpdatePassword" component={UpdatePassword} /> 
          <Stack.Screen name="changepassword" component={ChangePasswordScreen} />
          <Stack.Screen name="detailmyprofile" component={ProfileDisplay} />
          <Stack.Screen name="updateinfo" component={UpdateInfomation}/>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
