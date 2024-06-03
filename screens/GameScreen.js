import { View, StyleSheet, TextInput, Button, FlatList, Text, Image } from 'react-native'
import React, { Component, useEffect, useState, useRef } from 'react'
import { useRoute } from '@react-navigation/native';
import Storage, { GAME_SESSIONS } from '../utils/Storage';
import HeaderLogo from '../components/HeaderLogo'
import GameSession from '../models/GameSessionModel';
import GameLoader from '../components/games/GameLoader';

export default function GameScreen({ navigation }) {

  const route = useRoute(); // Get the route object from the navigation prop
  const { category, players, rounds } = route.params;  // Get the category parameter from the route object
  const gameCategory = GameLoader.getInstance().getGameByName(category);
  const [gameSession, setGameSession] = useState(new GameSession(gameCategory, players));
  const [round, setRound] = useState(1);
  const [roundScores, setRoundScores] = useState([]);

  const handlePlayerScoreChange = (playerId, score) => {
    console.log(`Player ${playerId} scored ${score}`);
    //if the score is empty, set it to 0
    if(score === "" || score === null || score === undefined){
      score = 0;
    }

    //coverting score to number
    score = parseInt(score,10);
    // Add the player's score to the roundScores array
    setRoundScores((prevRoundScores) => {
      // Check if the player already has a score in the roundScores array
      const scoreIndex = prevRoundScores.findIndex((s) => s.playerId === playerId);
  
      if (scoreIndex !== -1) {
        // If the player already has a score, update the score
        return prevRoundScores.map((s, index) => 
          index === scoreIndex ? { ...s, score } : s
        );
      } else {
        // If the player does not have a score, add the score
        return [
          ...prevRoundScores,
          { playerId, score }
        ];
      }
    });


    // Update the player's score
    setRoundScores((prevroundScores) => {
      const newRoundScores = prevroundScores.map(playerScore => {
        if (playerScore.playerId === playerId) {
          return {
            playerId,
            score
          }
        }
        return playerScore;
      });
      return newRoundScores;
    });


    console.log("Player Scores: ", roundScores);
    console.log("----------------------------------------------")
  }

  const addPlayerScore = () => {
    // Add the roundScores to the gameSession
    roundScores.forEach(playerScore => {
       gameSession.addPlayerScore(playerScore.playerId, playerScore.score);
      
    });
  }

  const handleNextRound = () => {
    console.log("Next Round Called!");
    console.log("Current Player Scores: ", roundScores);

    // check if any score is 0, if so, alert the user
    let zeroScore = false;
    roundScores.forEach(playerScore => {
      if(playerScore.score === 0){
        zeroScore = true;
      }
    });
    if(zeroScore){
      alert("Please enter a score for all players");
    }else{
      // Increment the round number
      setRound(round + 1);
      // Add the roundScores to the gameSession
      addPlayerScore();
      // Clear the roundScores array
      setRoundScores([]);
      //reset the score to 0
      resetScores();
      console.log("session Id: ", gameSession.id);
      console.log("Player Scores: ", gameSession.getAllScores());
      console.log("----------------------------------------------")
    }
  }

  const saveData = async () => {
    await Storage.addData(GAME_SESSIONS, gameSession);
  }

  const gameover = () => {
    addPlayerScore();
  
    gameSession.endGameSession();
  
    // save the game session 
    setGameSession(()=>(gameSession));
  }

  const handleFinishGame = () =>{
    console.log("Finish Game Called!");
    gameover();
    // Add the roundScores to the gameSession
    console.log("Game Session: ", gameSession);
    console.log("session Id: ", gameSession.id);
    console.log("Player Scores: ", gameSession.getAllScores());
    console.log("----------------------------------------------")
    saveData();
    navigation.navigate('GameOver', { gameSession });
  }



  const resetScores = () => {
    //initialize the player scores to 0
    players.forEach(player => {
      setRoundScores((prevroundScores) => [
        ...prevroundScores,
        {
          playerId: player.id,
          score: 0
        }
      ]);
  });  }

  useEffect(() => {
    resetScores();
  }, []);

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
                      // value={roundScores.find(playerScore => playerScore.playerId === item.id) ? roundScores.find(playerScore => playerScore.playerId === item.id).score : 0}
                      value={roundScores.find(playerScore => playerScore.playerId === item.id)?.score.toString() || '0'}
                    />
                  </View>
              }
              keyExtractor={(item, index) => index.toString()} />
          </View>
            {round < rounds ? <Button title="Next Round" onPress={handleNextRound} /> : <Button style={styles.finishButton} title="Finish Game" onPress={handleFinishGame} />}
          
          <View >
            {/*
            //
            // this block is where the scores will be printed out
            // for test only
            // should be removed while UI/UX is being designed
            //
            */}
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
  finishButton:{
    color:"black",
  }
});