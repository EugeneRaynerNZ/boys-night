import { View, StyleSheet, TextInput, Button, FlatList, Text, Image } from 'react-native'
import React, { Component, useEffect, useState, useRef } from 'react'
import { useRoute } from '@react-navigation/native';
import HeaderLogo from '../components/HeaderLogo'
import GameSession from '../models/GameSessionModel';
import GameLoader from '../components/games/GameLoader';


export default function GameScreen() {

  const route = useRoute(); // Get the route object from the navigation prop
  const { category, players } = route.params;  // Get the category parameter from the route object
  const gameCategory = GameLoader.getInstance().getGameByName(category);
  // const gameSession = new GameSession(gameCategory, players);
  const [gameSession, setGameSession] = useState(new GameSession(gameCategory, players));
  const [round, setRound] = useState(1);
  const [playerScores, setPlayerScores] = useState([]);

  const handlePlayerScoreChange = (playerId, score) => {
    console.log(`Player ${playerId} scored ${score}`);
    //coverting score to number
    score = parseInt(score,10);
    // Add the player's score to the playerScores array
    setPlayerScores((prevPlayerScores) => [
      ...prevPlayerScores,
      {
        playerId,
        score
      }
    ]);

    console.log("Player Scores: ", playerScores);
    console.log("----------------------------------------------")
  }

  const handleNextRound = () => {
    console.log("Next Round Called!");
    console.log("Current Player Scores: ", playerScores);
    // Add the playerScores to the gameSession
    playerScores.forEach(playerScore => {
      gameSession.addPlayerScore(playerScore.playerId, playerScore.score);
    });
    // Increment the round number
    setRound(round + 1);
    // Clear the playerScores array
    setPlayerScores([]);
    console.log("session Id: ", gameSession.id);
    console.log("Player Scores: ", gameSession.getAllScores());
    console.log("----------------------------------------------")
  }

  const handleFinishGame = () =>{
    console.log("Finish Game Called!");
    handleNextRound();
    
    console.log("session Id: ", gameSession.id);
    console.log("Player Scores: ", gameSession.getAllScores());
    console.log("----------------------------------------------")
  }

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.container}>
      <HeaderLogo />

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
                      onChangeText={(score) => handlePlayerScoreChange(item.id, score)}
                      value={playerScores.find(playerScore => playerScore.playerId === item.id) ? playerScores.find(playerScore => playerScore.playerId === item.id).score : ""}
                    />
                  </View>
              }
              keyExtractor={(item, index) => index.toString()} />
          {/* print out the scores in table */}
          </View>

          <Button title="Next Round" onPress={handleNextRound} />
          <Button title="Finish Game" />
          <FlatList
            data={players}
            renderItem={
              ({ item }) =>
                <View style={styles.player}>
                  <Text style={styles.playerName}>{item.name}</Text>
                  <Text style={styles.playerScore}>{gameSession.playerScore.get(item.id).score}</Text>
                  <Text style={styles.playerScore}>{gameSession.getPlayerTotalScore(item.id)}</Text>

                </View>
            }
            keyExtractor={(item, index) => index.toString()} />



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