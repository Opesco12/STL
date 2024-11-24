import AsyncStorage from "@react-native-async-storage/async-storage";
import Keys from "./keys";

const storeUserData = async (data) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(Keys.USER_DATA, jsonData);
  } catch (error) {
    console.error("Error storing user data", error);
  }
};

const retrieveUserData = async () => {
  try {
    const storedData = await AsyncStorage.getItem(Keys.USER_DATA);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData;
    } else {
      console.log("No Data found in async storage");
    }
  } catch (error) {
    console.error("Error retrieving user data", error);
  }
};

export { storeUserData, retrieveUserData };
