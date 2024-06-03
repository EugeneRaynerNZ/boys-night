import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Storage, { GAME_SESSIONS } from '../utils/Storage';

export default function HistoryScreen() {

    const [gameSessions, setGameSessions] = useState([]);

    const timeFormat = (date)=>{
        return date.toLocaleString('en-NZ', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
    };

    const getGameSessions = async () => {
        const sessions = await Storage.getData(GAME_SESSIONS);
        setGameSessions(()=>(sessions));
    }

    const clearHistory = async () => {
        await Storage.removeData(GAME_SESSIONS);
        setGameSessions([]);
        return alert("History Cleared");
    }

    const handleRefresh = () => {
        getGameSessions();
        console.log("Game Sessions: ", gameSessions);
        let playerScoresArray = gameSessions[0].playerScore;

        console.log("Player Scores Array: ", playerScoresArray);
    }

    useEffect(() => {
        getGameSessions();
        if(gameSessions===null || gameSessions===undefined || gameSessions.length===0){
            console.log("No game sessions found");
            return; 
        }else{
            console.log("Game Sessions: ", gameSessions[0]);
            console.log("Start Time: ", gameSessions[0].startTime);
            console.log("Game ID: ", gameSessions[0].gameId);
            console.log("Game Name: ", gameSessions[0].gameName);
            console.log("Session ID: ", gameSessions[0].id);
            console.log("palyers score: ", gameSessions[0].playerScore);
            console.log("End Time: ", gameSessions[0].endTime);
            
            console.log("------------------------------------------------");

            // convert the playerScore map to an array
            const array = Array.from(gameSessions[0].playerScore);
            console.log("Player Score Array: ", array);
            // Array.from(gameSessions[0].playerScore).map(([playerId, playerData]) => (
            //     console.log("Player ID: ", playerId),
            //     console.log("Player Name: ", playerData.playerName),
            //     console.log("Player Scores: ", playerData.score)
            // ));
            console.log("------------------------------------------------");

        }
    }, []);


    return (
        <View style={styles.bodyContainer}>
            <View style={styles.container}>
            <Button title="Clear History" onPress={clearHistory} /> 
            <Button title="Refresh" onPress={handleRefresh} />
           <Text style={styles.columnHeading}>HistoryScreen</Text>
                <View style={styles.columnHeadingsContainer}>
                    <View style={styles.scoreContainer}>
                        {gameSessions !== null ? gameSessions.map((session, index) => (
                            <View key={index} style={styles.player}>
                                <Text style={styles.playerName}>Game: {session.gameName}</Text>
                                {session.playerScore.length > 0? session.playerScore.map((player, pIndex)=>(
                                    <View key={pIndex} style={styles.playersContainer}>
                                        <Text >Player: {player.playerName}</Text>
                                        <Text >Score: {player.score.join(', ')}</Text>
                                    </View>
                                )) : <Text>null</Text> }
                            </View>
                        )) : <Text style={styles.columnHeading}>No game sessions found</Text>}
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
    scoreContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
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