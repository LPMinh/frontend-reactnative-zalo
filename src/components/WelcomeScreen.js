import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function WelcomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/icon/logo.jpg")}
        style={{ width: "100%", height: 100 }}></Image>
      <View style={[styles.button_view]}>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#00A2FF",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("login")}>
          <Text style={{ color: "#fff", fontSize: 20 }}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#F3F4F8",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.push("register")}
        >
          <Text>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
  },
  button_view: {
    width: "80%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
