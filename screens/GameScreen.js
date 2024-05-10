import { View, StyleSheet, TextInput, Button, FlatList, Text, Image } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import HeaderLogo from '../components/HeaderLogo'
import GameSession from '../models/GameSessionModel';
import GameLoader from '../components/games/GameLoader';


export default function GameScreen() {

  const route = useRoute(); // Get the route object from the navigation prop
  const { category, players } = route.params;  // Get the category parameter from the route object
  const [round, setRound] = useState(1);
  const gameCategory = GameLoader.getInstance().getGameByName(category);
  const gameSession = new GameSession(gameCategory, players);


  const handleNextRound = () => {
    setRound(round + 1);
    console.log(gameSession.getAllScores());
  };

  const handleScoreUpdate = (playerId, score) => {
    gameSession.addPlayerScore(playerId, score);
  };

  return (
    <View style={styles.bodyContainer}>
      <HeaderLogo />
      <View style={styles.container}>

        <View style={styles.columnHeadingsContainer}>
          <Text style={styles.columnHeading}>{category} Round {round}</Text>
          <Text style={styles.columnHeading}>Score:</Text>
        </View>

        <View style={styles.playersContainer}>
          <View style={styles.player}>
            {/* this is where people can input their score */}
            <FlatList
              data={players}
              renderItem={
                ({ item }) =>
                  <View style={styles.player}>
                    <Text style={styles.playerName}>{item.name}</Text>
                    <TextInput
                      style={styles.playerScore}
                      placeholder="0"
                      type="number"
                      keyboardType="numeric"
                      onChangeText={(score) => handleScoreUpdate(item.id, score)}

                    />
                  </View>
              }
              keyExtractor={(item, index) => index.toString()} />
          </View>

          <Button title="Next Round" onPress={handleNextRound} />
          <Button title="Finish Game" onPress={handleNextRound} />

        </View>

      </View>
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
  columnHeadingsContainer: {

  },
  columnHeading: {
    color: "white"
  },
  playersContainer: {
    display: "flex",
    rowGap: 16
  },
  player: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
    padding: 8,
  },
  playerName: {
    color: "white",
    flex: 3
  },
  playerScore: {
    backgroundColor: "#848484",
    flex: 1
  },
});