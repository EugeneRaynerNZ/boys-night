import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Storage, {GAMES} from '../utils/Storage';
import HeaderLogo from '../components/HeaderLogo';
import { Button } from 'react-native';
import GameLoader from '../components/games/GameLoader';

export default function CategoryScreen({ navigation }) {

  const [games, setGames] = useState([]);

  const handleGameSelection = (category) => {
    // navigate to the AddPlayers screen and pass the category as a parameter
    navigation.navigate('AddPlayers', { category });
  }

  const loadGames = async () => {
    const savedGames = await Storage.getData(GAMES);
    if (savedGames !== null) {
      setGames(savedGames);
    }
  }

  const GameCard = ({ game })  =>{
    return (
      <TouchableOpacity onPress={() => handleGameSelection(game.name)} style={styles.category}>
          <Image source={game.logo} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{game.name}</Text>
        </TouchableOpacity>
    )
  }

  useEffect(() => {
    // Load the games from AsyncStorage
    loadGames();
    }, []);

  return (
    <View style={[styles.bodyContainer]}>

      <HeaderLogo />

      {games.map((game, index) => (
        <GameCard key={index} game={game} />
      ))}
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
    width: "100%",
    gap: 16
  },
  category: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 100,
    backgroundColor: '#555555',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'flex-start',
    padding: 32,
    rowGap: 16,
    width: "100%",
  },
  categoryImage: {
    width: 40,
    height: 40
  },
  categoryText: {
    fontSize: 24,
    color: "white"
  }
});