import * as RootNavigation from "../utilities/RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function signOut() {
  try {
    await AsyncStorage.clear();
    // console.log(await AsyncStorage.multiGet(["access_token", "refresh_token"]));
    RootNavigation.navigate("Loading", { toScreen: "Welcome" });
  } catch (e) {
    RootNavigation.navigate("Loading", { toScreen: "Welcome" });
    console.log(e);
  }
}
