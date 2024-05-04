import { View, StyleSheet, TextInput, Button, FlatList, Text, Image, TouchableOpacity } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Storage from '../utils/Storage';
import { PLAYERS } from '../utils/StorageKey';
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

  const addNewPlayer = async () => {
    // Check if the name is empty
    if (name === '') {
      return alert('Please enter a name');
    }

    //check if the name already exists in the saved players
    if (savedPlayers.some(p => p.name === name)) {
      return alert('Player already exists');
    }

    // Create a new player object
    try {
      const newPlayer = new Player(name);
      const updatedPlayers = [...savedPlayers, newPlayer];
      // Add the new player object to the players state
      setSavedPlayers(updatedPlayers);
      // Save the new player object to AsyncStorage
      await Storage.setData(PLAYERS, updatedPlayers);
      // Clear the input field
      setName('');
      console.log("Player has been added: ", newPlayer.name);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  }

  const removePlayer = (player) => {
    // remove the player from the list of players
    const newSavedPlayers = savedPlayers.filter(p => p.id !== player.id);
    setSavedPlayers(newSavedPlayers);
    console.log("Player has been removed from list: ", name);
  }

  const addToPlayList = (player) => {
    //check if the player already exists in the play list
    if (players.some(p => p.id === player.id)) {
      return alert('Player already exists');
    }

    // add the player to the list of players
    setPlayers([...players, player]);
    console.log("Player has been added to play list: ", player.name);
  }

  const removeFromPlayList = (name) => {
    // remove the player from the list of players
    const newPlayers = players.filter(player => player.name !== name);
    setPlayers(newPlayers);
    console.log("Player has been removed from play list: ", name);
  }

  const retrieveData = async () => {
    console.log('Retrieving data');
    try {
      // Retrieve players from AsyncStorage
      const storedPlayers = await Storage.getData(PLAYERS);
      if (storedPlayers !== null) {
        // Parse retrieved data and set it in state
        setSavedPlayers(storedPlayers);
      }else{
        console.log('No data found');
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  useEffect(() => {
    // Retrieve players from AsyncStorage when component mounts
    retrieveData();
  }, []);

  return (
    <View style={[styles.bodyContainer]}>

      <View style={styles.container}>
        <View>
          <HeaderLogo />
        </View>
        <View style={styles.listContainer}>
          <Text style={{ color: "white" }}>Players</Text>
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
                  <TouchableOpacity onPress={() => removeFromPlayList(item.name)}>
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
            style={{
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "red",
              padding: 8,
            }}
            onChangeText={(text) => setName(text)} />

          <Button title="Add New Player" onPress={addNewPlayer} />
        </View>


        {/* This is the list of saved players. When we click on a player, they should be added to the list of players */}
        <View style={styles.listContainer}>
          <Text style={{ color: "white" }}>Saved Players</Text>
          <FlatList
            data={savedPlayers}
            renderItem={
              ({ item }) =>
                <TouchableOpacity onPress={() => addToPlayList(item)}>
                  <View style={styles.playerContainer}>
                    <View style={styles.player}>
                      <Image source={PlayerIcon} style={styles.playerIcon} />
                      <Text style={styles.playerText}>{item.name}</Text>
                    </View>
                    {/* This button needs an onclick which removes the player from the list of players */}
                    <TouchableOpacity onPress={() => removePlayer(item)}>
                      <Image source={TrashIcon} style={styles.trashIcon} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()} />
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
    padding: 16,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
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