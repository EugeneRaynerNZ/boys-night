// Storage utility functions for saving, retrieving, and removing data from AsyncStorage

import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
    // Save data to AsyncStorage
    setData: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            console.log('Data has been saved', key, value);
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    },
    
    // Get data from AsyncStorage
    getData: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            console.error('Error retrieving data: ', error);
        }
    },

    // Remove data from AsyncStorage
    removeData: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing data: ', error);
        }
    },

    //update data in AsyncStorage
    updateData: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error updating data: ', error);
        }
    }
};

export default Storage;