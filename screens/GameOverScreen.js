import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Storage, {GAME_SESSIONS} from '../utils/Storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function GameOverScreen({ navigation }) {

    const route = useRoute(); // Get the route object from the navigation prop
    const { gameSession } = route.params;  // Get the category parameter from the route object
    const [players, setPlayers] = useState(gameSession.playerScore); // This is the list of players that are displayed on the screen
    let savedSessions;
    // const players = gameSession.players;
    const playerScoresArray = Array.from(gameSession.playerScore.entries()).map(([playerId, playerData]) => ({
        playerId,
        playerName: playerData.playerName,
        scores: playerData
    }));

    const [winner, setWinner] = useState('');

    const calculateWinner = () => {
        // set the winner to the one who has the lowest score
        let lowestScore = Number.MAX_VALUE;
        let winner = '';
        playerScoresArray.forEach(player => {
            let totalScore = gameSession.getPlayerTotalScore(player.playerId);
            if (totalScore < lowestScore) {
                lowestScore = totalScore;
                winner = player.playerName;
            }else if (totalScore === lowestScore) {
                //if the scores are equal, the winner is 'null'
                winner = null;
            }
        });
        setWinner(winner);
    }

    const getStoredGameSessions = async () => {
        savedSessions = await Storage.getData(GAME_SESSIONS);
        console.log("saved Sessions: ", savedSessions);
    }
    
    useEffect(() => {
        calculateWinner();
        getStoredGameSessions();
        console.log("Game Over Screen: ");
        console.log("Game Session: ", gameSession);
        console.log("Players: ", players)
        console.log("saved Sessions: ", savedSessions);
        console.log("--------------------------------");
    }, [])

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.columnHeadingsContainer}>
                <Text style={styles.columnHeading}>GameOver!</Text>
            </View>

            {playerScoresArray.map((player) => (
                <View key={player.playerId}>
                    <Text style={styles.columnHeading}>{player.playerName}</Text>
                    <Text style={styles.columnHeading}>{gameSession.getPlayerScore(player.playerId).join(', ')}</Text>
                    <Text style={styles.columnHeading}>{gameSession.getPlayerTotalScore(player.playerId)}</Text>
                </View>
            ))}
            {winner === null ? <Text style={styles.columnHeading}>It's a tie!</Text> : <Text style={styles.columnHeading}>The Winner is {winner}</Text>}
            <Button title="Finish" onPress={()=>(navigation.navigate('Category'))} />
            <Button title="refresh" onPress={()=>(getStoredGameSessions)} />

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