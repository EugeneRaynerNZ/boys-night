// Storage utility functions for saving, retrieving, and removing data from AsyncStorage

import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
    // Save data to AsyncStorage, if the key already exists, overwrite the existing data
    setData: async (key, value) => {
        try {
            if (Array.isArray(value)) {
                //if the value is an array, save it as an array
                await AsyncStorage.setItem(key, JSON.stringify(value));
            }else{
                //if the value is not an array, save it as a single element array
                await AsyncStorage.setItem(key, JSON.stringify([value]));
            }
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    },
    // add data to AsyncStorage, if the key already exists, add the new data to the end of existing data
    addData: async (key, value) => {
        try {
            // Get the previous data
            const previousData = await AsyncStorage.getItem(key);
            let newData = [];
    
            if (previousData !== null) {
                // Parse the previous data if it exists
                newData = JSON.parse(previousData);
                
                if (!Array.isArray(newData)) {
                    // If previousData is not an array, treat it as a single element array
                    newData = [previousData];
                }
            }
    
            // Add the new data to the previous data or newly created array
            newData.push(value);
            // Save the new data
            await AsyncStorage.setItem(key, JSON.stringify(newData));
            console.log('Data has been added', key, value);
        } catch (error) {
            console.error('Error adding data: ', error);
        }
    },
    // Merge data to AsyncStorage, if the key already exists, merge the new data with the existing data
    megerData: async (key, value) => {
        try {
            await AsyncStorage.mergeItem(key, JSON.stringify(value));
            console.log('Data has been saved', key, value);
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    },
    // Get data from AsyncStorage, if the key does not exist, return null
    getData: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null && value !== undefined) {
                return JSON.parse(value);
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error retrieving data - from Storage.getData(): ', error);
        }
    },

    // Remove data from AsyncStorage, if the key does not exist, do nothing
    removeData: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing data: ', error);
        }
    },
};

const PLAYERS = 'players';
const GAMES = 'games';
const GAME_SESSIONS = 'game_sessions';

export default Storage;
export { PLAYERS, GAMES, GAME_SESSIONS };