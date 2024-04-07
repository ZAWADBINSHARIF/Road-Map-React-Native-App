// external import
import AsyncStorage from "@react-native-async-storage/async-storage";


const LocalStorage = {
    async getData(key: string) {
        try {
            const stringValue: string | null = await AsyncStorage.getItem(key);
            const values = JSON.parse(stringValue!);
            return values;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    async saveData(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
            return;
        }
    },
    async removeData(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
            return;
        }
    }
};

export default LocalStorage;