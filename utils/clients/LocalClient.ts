import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LocalClient {
    getAsync = async (key: string): Promise<string | null> =>
        await AsyncStorage.getItem(key);
    setAsync = async (key: string, data: string) =>
        await AsyncStorage.setItem(key, data);
    removeAllAsync = async (key: string) =>
        await AsyncStorage.removeItem(key);
}
