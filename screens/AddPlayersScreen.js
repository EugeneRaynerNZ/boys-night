import { View, StyleSheet, SectionList, TextInput, Button, FlatList, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useRoute } from '@react-navigation/native';
import Storage, { PLAYERS } from '../utils/Storage';
import HeaderLogo from '../components/HeaderLogo';
import TrashIcon from '../assets/trash.png';
import Player from '../models/PlayerModel';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddPlayersScreen({ navigation }) {

  const route = useRoute(); // Get the route object from the navigation prop
  const { category, rounds } = route.params;  // Get the category parameter from the route object
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState('');

  const textInputRef = useRef(null);

  // add default players
  const [players, setPlayers] = useState([]); // This is the list of players that are displayed on the screen
  const [savedPlayers, setSavedPlayers] = useState([]); // This is the list of players that are saved in AsyncStorage

  /**
   *  addNewPlayer() && removePlayer() - these functions are used to add and remove players from the list of saved players
   *  addToPlayList() && removeFromPlayList() - these functions are used to add and remove players from the list of playing players
   * 
   */



  // need to change this to be on the "next" button that exists on the keypad as per designs
  const addNewPlayer = async () => {
    // Check if the name is empty
    if (name === '') {
      return alert('Please enter a name');
    }

    // this should not exist. The list should remove the players that exist in the current game
    // if(savedPlayers.some(p => p.name === name)){
    //   return alert('Player already exists');
    // }

    // Create a new player object
    const newPlayer = new Player(name);

    try {
      // Save the new player object to AsyncStorage
      await Storage.addData(PLAYERS, newPlayer);
      console.log("Player has been added: ", newPlayer.name);
      console.log("Saved player list:  ", savedPlayers)
    } catch (error) {
      console.error('Error saving data - from AddPlayersScreen.addNewPlayer(): ', error);
    }

    // Add the new player object to the list of saved players state
    const updatedPlayers = [...savedPlayers, newPlayer];
    // Add the new player object to the players state
    setSavedPlayers(() => (updatedPlayers));
    // Clear the input field
    setName('');
    setIsVisible(false);
  }

  const removePlayer = async (player) => {
    // remove the player from the saved list of players
    const newSavedPlayers = savedPlayers.filter(p => p.id !== player.id); //return all players except the one to be removed

    //check if the player already exists in the play list
    if (players.some(p => p.id === player.id)) {
      //remove the player from the play list
      const newPlayers = players.filter(p => p.id !== player.id);
      setPlayers(() => (newPlayers));
    }

    // if the newSavedPlayers is empty, remove the key from AsyncStorage
    if (newSavedPlayers.length === 0) {
      await Storage.removeData(PLAYERS);
    } else {
      // Save the updated list of players to AsyncStorage
      await Storage.setData(PLAYERS, newSavedPlayers);
    }

    setSavedPlayers(() => (newSavedPlayers));
    // Save the updated list of players to AsyncStorage
    // await Storage.setData(PLAYERS, newSavedPlayers);
    // await Storage.megerData(PLAYERS, newSavedPlayers);
    console.log("Player has been removed from list: ", player);
  }

  const addToPlayList = (player) => {
    //check if the player already exists in the play list
    if (players.some(p => p.id === player.id)) {
      return alert('Player already exists');
    }

    // add the player to the list of players
    setPlayers([...players, player]);

    // remove the player from the saved list of players
    const newSavedPlayers = savedPlayers.filter(p => p.id !== player.id); //return all players except the one to be removed
    setSavedPlayers(() => (newSavedPlayers));
  }

  const removeFromPlayList = (id) => {
    // find the player in play list
    const player = players.find(player => player.id === id);

    //remove the player form the play list
    const newPlayers = players.filter(player => player.id !== id);
    setPlayers(() => (newPlayers));

    // add back the player to the saved list of players
    setSavedPlayers([...savedPlayers, player]);

    console.log("Player has been removed from play list: ", id);
  }

  const retrieveData = async () => {
    console.log('Retrieving data');
    try {
      // Retrieve players from AsyncStorage
      const newSvaedPlayers = await Storage.getData(PLAYERS);
      if (newSvaedPlayers !== null && newSvaedPlayers !== undefined) {
        // Parse retrieved data and set it in state
        setSavedPlayers(() => (newSvaedPlayers));
        console.log('Data retrieved: ', newSvaedPlayers);
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.error('Error retrieving data - from AddPlayersScreen.retrieveData(): ', error);
    }
  };

  useEffect(() => {
    if (isVisible && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isVisible]);

  const handleButtonPress = () => {
    setIsVisible(true);

  };

  const handleGameStart = (game) => {
    //check if player list is empty
    if (players.length === 0) {
      return alert('Please add players to start the game');
    }
    // navigate to the AddPlayers screen and pass the category as a parameter
    navigation.navigate(game, { category, players, rounds });
  }

  const clearAllPlayers = async () => {
    // Clear all players from the AsyncStorage
    await Storage.removeData(PLAYERS);
    setSavedPlayers([]);
    return alert('All players have been removed');
  }


  useEffect(() => {
    // Retrieve players from AsyncStorage when component mounts
    retrieveData();
  }, []);


  const sections = [
    {
      title: 'Players for ' + category,
      data: players,
      renderItem: ({ item }) => (
        <View style={styles.listContainer}>
          <View style={styles.playerContainer}>
            <View style={styles.player}>
              <Text style={styles.playerText}>{item.name}</Text>
            </View>
            {/* This button needs an onclick which removes the player from the list of players */}
            <TouchableOpacity onPress={() => removeFromPlayList(item.id)}>
              <Image source={TrashIcon} style={styles.trashIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )
    },
    {
      title: 'Saved Players',
      data: savedPlayers,
      renderItem:
        ({ item }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => addToPlayList(item)}>
              <View style={styles.playerContainer}>
                <View style={styles.player}>
                  <Text style={styles.playerText}>{item.name}</Text>
                </View>

                <TouchableOpacity onPress={() => removePlayer(item)}>
                  <Image source={TrashIcon} style={styles.trashIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

        )
    }
  ];


  return (
    <View style={[styles.bodyContainer]}>

      <View>
        <HeaderLogo />
      </View>

      <View style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => item}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ color: "white" }}>{title}</Text>
          )}
        />
      </View>

      <View style={styles.addAnotherPlayer}>

        {isVisible && (
          <TextInput
            placeholder="Enter a name"
            value={name}
            style={styles.playerContainer}
            placeholderTextColor="white"
            ref={textInputRef}
            onChangeText={(text) => setName(text)}
            onSubmitEditing={addNewPlayer} />
        )}

        {!isVisible && (
          <TouchableOpacity style={styles.primaryButton} onPress={handleButtonPress}>
            <Text style={styles.primaryButtonText}>Save a new player</Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <TouchableOpacity style={styles.primaryButton} onPress={() => handleGameStart('Game')} >
          <Text style={styles.primaryButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#060B43',
    flex: 1,
    display: "flex",
    padding: 20,
    flexWrap: "wrap",
    flexDirection: "column",
    gap: 16,
    overflowY: "scroll"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
    gap: 16
  },
  listContainer: {
    display: "flex",
    gap: 16,
    width: "100%",
  },
  playerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#2F3061",
    padding: 16,
    justifyContent: "space-between",
    borderRadius: 8,
    color: "white",
    marginBottom: 8
  },
  player: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    columnGap: 16
  },
  playerText: {
    color: "white"
  },
  trashIcon: {
    width: 24,
    height: 24
  },
  addAnotherPlayer: {
    display: "flex",
    gap: 16
  },
  primaryButton: {
    borderRadius: 36,
    backgroundColor: "#0E34A0",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});