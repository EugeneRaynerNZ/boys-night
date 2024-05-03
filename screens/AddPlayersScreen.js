import { View, StyleSheet, TextInput, Button, FlatList, Text, Image, TouchableOpacity } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderLogo from '../components/HeaderLogo'
import PlayerIcon from '../assets/user.png'
import TrashIcon from '../assets/trash.png'
import Player from '../models/PlayerModel'

export default function AddPlayersScreen() {

    const route = useRoute(); // Get the route object from the navigation prop
    const { category } = route.params;  // Get the category parameter from the route object

    const [name, setName] = useState('');
    const [players, setPlayers] = useState([]); // This is the list of players that are displayed on the screen
    const [savedPlayers, setSavedPlayers] = useState([]); // This is the list of players that are saved in AsyncStorage

    // useEffect(() => {
    //     // Retrieve players from AsyncStorage when component mounts
    //     retrieveData();
    // }, []);

    const addNewPlayer = async() =>{
      // Check if the name is empty
      if(name === '') {
        return alert('Please enter a name');
      }

      //check if the player already exists
      if(savedPlayers.some(player => player.name === name)){
        return alert('Player already exists');
      }
      
      // Create a new player object
      try{
        const newPlayer = new Player(name);
        // Save the new player object to AsyncStorage
        // await AsyncStorage.setItem('players', JSON.stringify(newPlayer));
        // Add the new player object to the players state
        setSavedPlayers([...savedPlayers, newPlayer]);
        // Clear the input field
        setName('');
      }catch(error){
        console.error('Error saving data: ', error);
      }
    }

    const removePlayer = (name) => {
      // remove the player from the list of players
      const newSavedPlayers = savedPlayers.filter(player => player.name !== name);
      setSavedPlayers(newSavedPlayers);
      console.log("Player has been removed from list: ", name);
    }


    // const retrieveData = async () => {
    //     try {
    //     // Retrieve players from AsyncStorage
    //     const storedPlayers = await AsyncStorage.getItem('players');
    //     if (storedPlayers !== null) {
    //         // Parse retrieved data and set it in state
    //         setPlayers(JSON.parse(storedPlayers));
    //     }
    //     } catch (error) {
    //     console.error('Error retrieving data: ', error);
    //     }
    // };


    return (
    <View style={[styles.bodyContainer]}>

      <View style={styles.container}>
        <View>
          <HeaderLogo />
        </View>
        <View style={styles.listContainer}>
          <FlatList 
            data={players}
            renderItem={
              ({ item }) => 
              <View style={styles.playerContainer}>
                <View style={styles.player}>
                  <Image source={PlayerIcon} style={styles.playerIcon} />
                  <Text style={styles.playerText}>{item.name}</Text>
                </View>
                {/* This button needs an onclick which removes the player from the list of players */}
                <TouchableOpacity onPress={()=>removePlayer(item.name)}>
                  <Image source={TrashIcon} style={styles.trashIcon} />
                </TouchableOpacity>
              </View>
            }
            keyExtractor={(item, index) => index.toString()} />
        </View>

        {/* When we click this button, the text input should appear and be focussed so that the user can already enter in the new name which will go into the input. The user can then click "add player now" */}
        <View style={styles.addAnotherPlayer}>
          {/* <Button title="Add another player" /> */}

          <TextInput
            placeholder="Enter a name"
            value={name}
            onChangeText={(text) => setName(text)} />

          <Button title="Add New Player" onPress={addNewPlayer} />
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