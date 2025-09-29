import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {

    // Saving data
    static saveData = async (data: any, key: string) => {
        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(key, jsonValue);
            console.log(`User data for key ${key} saved successfully!`);
        } catch (e) {
            console.error(`Error saving data for key ${key}`, e);
        }
    };

    // Getting Data
    static getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(`Error getting data for key ${key}`, e);
        }
    };

    // Removing Data
    static removeData = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log(`Data for key ${key} removed successfully!`);
        } catch (e) {
            console.error(`Error removing data for key ${key}`, e);
        }
    };

    // Clear all Data
    static clearData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('All data cleared successfully!');
        } catch (e) {
            console.error('Error clearing data', e);
        }
    };

}
