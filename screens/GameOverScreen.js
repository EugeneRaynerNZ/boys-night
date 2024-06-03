import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function GameOverScreen({ navigation }) {

    const route = useRoute(); // Get the route object from the navigation prop
    const { gameSession } = route.params;  // Get the category parameter from the route object
    const [winner, setWinner] = useState('');

    const calculateWinner = () => {
        // set the winner to the one who has the lowest score
        const winner = gameSession.getLowestScore();
        console.log("winner: ", winner);
        setWinner(()=>(winner.playerName));
    }
    
    useEffect(() => {
        calculateWinner();
        console.log("Game Over Screen: ");
        console.log("Game Session: ", gameSession);
        console.log("--------------------------------");
    }, [])

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.columnHeadingsContainer}>
                <Text style={styles.columnHeading}>GameOver!</Text>
            </View>

            <View>
                {gameSession.playerScore.map((player) => (
                    <View key={player.playerId}>
                        <Text style={styles.columnHeading}>Player: {player.playerName}</Text>
                        <Text style={styles.columnHeading}>Round Score: {player.score.join(', ')}</Text>
                        <Text style={styles.columnHeading}>Total Score: {player.totalScore}</Text>
                    </View>
                ))}
            </View>
            {winner === 'null' ? <Text style={styles.columnHeading}>It's a tie!</Text> : <Text style={styles.columnHeading}>The Winner is {winner}</Text>}
            <Button title="Finish" onPress={()=>(navigation.navigate('Category'))} />
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