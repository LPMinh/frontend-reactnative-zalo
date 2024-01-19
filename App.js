import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTab from './src/components/BottomTab';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-web';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer style={styles.container} >
      <Stack.Navigator screenOptions={{headerShown:false,
       

      
      }}>
        <Stack.Screen name="tab" component={BottomTab} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
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
