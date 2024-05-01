import { View, StyleSheet, TextInput, Button, FlatList, Text, Image } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderLogo from '../components/HeaderLogo'
import PlayerIcon from '../assets/user.png'
import TrashIcon from '../assets/trash.png'

export default function AddPlayersScreen() {

    const route = useRoute(); // Get the route object from the navigation prop
    const { category } = route.params;  // Get the category parameter from the route object

    const [name, setName] = useState(''); // State variable to store the name entered by the user
    const [names, setNames] = useState([]); // State variable to store the list of names

    useEffect(() => {
        // Retrieve names from AsyncStorage when component mounts
        retrieveData();
    }, []);

    const saveData = async () => {
        try {
        // Add new name to the list
        const updatedNames = [...names, name];
        setNames(updatedNames);
        // Save the updated list to AsyncStorage
        await AsyncStorage.setItem('names', JSON.stringify(updatedNames));
        } catch (error) {
        console.error('Error saving data: ', error);
        }
    };

    const retrieveData = async () => {
        try {
        // Retrieve names from AsyncStorage
        const storedNames = await AsyncStorage.getItem('names');
        if (storedNames !== null) {
            // Parse retrieved data and set it in state
            setNames(JSON.parse(storedNames));
        }
        } catch (error) {
        console.error('Error retrieving data: ', error);
        }
    };


    return (
    <View style={[styles.bodyContainer]}>

      <HeaderLogo />

      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList 
            data={names}
            renderItem={
              ({ item }) => 
              <View style={styles.playerContainer}>
                <View style={styles.player}>
                  <Image source={PlayerIcon} style={styles.playerIcon} />
                  <Text style={styles.playerText}>{item}</Text>
                </View>
                {/* This button needs an onclick which removes the player from the list of players */}
                <Image source={TrashIcon} style={styles.trashIcon} />
              </View>
            }
            keyExtractor={(item, index) => index.toString()} />
        </View>

        {/* When we click this button, the text input should appear and be focussed so that the user can already enter in the new name which will go into the input. The user can then click "add player now" */}
        <View style={styles.addAnotherPlayer}>
          <Button title="Add another player" />

          <TextInput
            placeholder="Enter a name"
            value={name}
            onChangeText={(text) => setName(text)} />

          <Button title="Add Player now" onPress={saveData} />
        </View>


      </View>

      {/* this button should navigate to the "GameScreen" */}
      <Button title="Start the game" />
    </View>
    )
  }

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#474747',
    flex: 1,
    display: "flex",
    padding: 20,
    flexWrap: "wrap",
    flexDirection: "column",
    gap: 16
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  listContainer: {
    display: "flex",
    // flexGrow: 1,
    width: "100%",
  },
  playerContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 8,
    backgroundColor: "#555555",
    padding: 16,
    justifyContent: "space-between",
    marginTop: 16
  },
  player: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    columnGap: 16
  },
  playerIcon: {
    width: 24,
    height: 24
  },
  playerText: {
    color: "white"
  },
  trashIcon: {
    width: 24,
    height: 24
  },
  addAnotherPlayer: {
    paddingTop: 16
  },
});