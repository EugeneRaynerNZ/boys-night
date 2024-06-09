import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderLogo from '../components/HeaderLogo';
import GameLoader from '../components/games/GameLoader';


export default function CategoryScreen({ navigation }) {

  const [games, setGames] = useState([]);

  const handleGameSelection = (category) => {
    // navigate to the AddPlayers screen and pass the category as a parameter
    if(category === null || category === undefined || category === ""){
      console.log("category is empty");
      alert("Please select a game to continue");
      return
    }
    navigation.navigate('AddPlayers', { category, rounds:1 });
  }

  const GameCard = ({ game })  =>{
    return (
      <TouchableOpacity onPress={() => handleGameSelection(game.name)} style={styles.category}>
          <Text style={styles.categoryText}>{game.name}</Text>
        </TouchableOpacity>
    )
  }

  const loadGames = () => {
    const gameLoader = GameLoader.getInstance();
    const allGames = gameLoader.getAllGames();
    // gameLoader.addGame({name: "Custom Game", logo: require('../assets/user.png'), description: "Create your own game"});
    setGames(allGames);
  }

  useEffect(() => {
    loadGames();
  }, []);


  return (
    <View style={[styles.bodyContainer]}>

      <HeaderLogo />
      <Text style={styles.whiteText}>What are we playing tonight?</Text>
      <View>
        <Text style={styles.categoryTitle}>Golf</Text>
        {/* Add another class "categorySelected" to GameCard when game is selected */}
        {/* separate categories from one another - golf as one. Pool as another */}
        <View style={styles.catergoryContainer}>{games.length === 0 ? <Text style={styles.whiteText}>Loading...</Text> : games.map((game, index) => (<GameCard key={index} game={game} />))}</View>
      </View>

      {/* don't show this button until you click the above item to select it. */}
      <TouchableOpacity 
        style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Select Players</Text>
      </TouchableOpacity>
      
    </View>
  )
}


const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#060B43',
    flex: 1,
    display: "flex",
    padding: 20,
    gap: 48
  }, 
  whiteText: {
    color: "white",
  },
  categoryTitle: {
    fontSize: 20,
    color: "white"
  },
  catergoryContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: "#1E2355",
    display: "flex",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
    flexBasis: '48%', // Slightly less than 50% to account for margin
    margin: '1%',
  },
  categorySelected: {
    background: "#0E34A0",
    border: "1px solid #A39D9D"
  },
  categoryText: {
    fontSize: 16,
    color: "white",
    textAlign: "center"
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