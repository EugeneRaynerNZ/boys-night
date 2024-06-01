import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Storage, { GAME_SESSIONS } from '../utils/Storage';

export default function HistoryScreen() {

    const [gameSessions, setGameSessions] = useState([]);

    const getGameSessions = async () => {
        const sessions = await Storage.getData(GAME_SESSIONS);
        setGameSessions(sessions);
    }

    useEffect(() => {
        getGameSessions();
        console.log("Game Sessions: ", gameSessions);
    }, []);


    return (
        <View style={styles.bodyContainer}>
           <Text style={styles.columnHeading}>HistoryScreen</Text>
            <View style={styles.container}>
                <View style={styles.columnHeadingsContainer}>
                    {gameSessions===null || gameSessions===undefined || gameSessions.length===0 ? <Text style={styles.columnHeading}>No game sessions found</Text> : <Text style={styles.columnHeading}>Game Sessions: </Text>}
                     <Text style={styles.columnHeading}>Game</Text>
                     <Text style={styles.columnHeading}>Players</Text>
                     <Text style={styles.columnHeading}>Start Time</Text>
                     <Text style={styles.columnHeading}>End Time</Text>
                </View>

                {/* <View style={styles.playersContainer}>
                     {gameSessions.map((session, index) => (
                          <View key={index} style={styles.player}>
                            <Text style={styles.playerName}>{session.gameName}</Text>
                            <Text style={styles.playerName}>{session.playerScore.size}</Text>
                            <Text style={styles.playerName}>{session.startTime}</Text>
                            <Text style={styles.playerName}>{session.endTime}</Text>
                          </View>
                     ))}
                </View> */}
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