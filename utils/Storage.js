// Storage utility functions for saving, retrieving, and removing data from AsyncStorage

import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
    // Save data to AsyncStorage
    setData: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify([value]));
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    },

    addData: async (key, value) => {
        try {
            // Get the previous data
            const perviousData = await AsyncStorage.getItem(key);
            if (perviousData !== null) {
                const newData = JSON.parse(perviousData);
                newData.push(value);    // Add the new data to the previous data
                await AsyncStorage.setItem(key, JSON.stringify(newData));
                console.log('Data has been saved', key, value);
            }else{
                // If there is no previous data, create a new array with the new data
                await AsyncStorage.setItem(key, JSON.stringify([value]));
            }
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    },

    megerData: async (key, value) => {
        try {
            await AsyncStorage.mergeItem(key, JSON.stringify(value));
            console.log('Data has been saved', key, value);
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    },
    // Get data from AsyncStorage
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

    // Remove data from AsyncStorage
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