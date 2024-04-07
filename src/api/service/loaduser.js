import AsyncStorage from "@react-native-async-storage/async-storage";

const getUser = async () => {
    let user = null;
    try {
        const userData = await AsyncStorage.getItem("user");
        user = JSON.parse(userData);
        return user;
    } catch (error) {
        console.log("Error fetching data: ", error);
        return null;
    }
};

export default getUser;