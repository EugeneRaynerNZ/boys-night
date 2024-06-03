import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import Storage, { GAME_SESSIONS } from '../utils/Storage';

export default function HistoryScreen() {

    const [gameSessions, setGameSessions] = useState([]);

    const timeFormat = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    const getGameSessions = async () => {
        const sessions = await Storage.getData(GAME_SESSIONS);
        setGameSessions(() => (sessions));
    }

    const clearHistory = async () => {
        await Storage.removeData(GAME_SESSIONS);
        setGameSessions([]);
        return alert("History Cleared");
    }

    const handleRefresh = () => {
        getGameSessions();
        console.log("Game Sessions: ", gameSessions);
    }

    useEffect(() => {
        getGameSessions();
        if (gameSessions === null || gameSessions === undefined || gameSessions.length === 0) {
            console.log("No game sessions found");
        } else {
            console.log("Game Sessions: ", gameSessions);
            console.log("------------------------------------------------");
        }
    }, []);


    return (
        <View style={styles.bodyContainer}>
            <View style={styles.container}>
                <Button title="Clear History" onPress={clearHistory} />
                <Button title="Refresh" onPress={handleRefresh} />
                <ScrollView>
                <View style={styles.scoreContainer}>
                    {gameSessions !== null ? gameSessions.map((session, index) => (
                        <View key={index} style={styles.player}>
                            <View style={styles.playersContainer}>
                                <Text style={styles.columnHeading} >Game: {session.gameName}</Text>
                                <Text style={styles.columnHeading}>Session ID: {session.id}</Text>
                                <Text style={styles.columnHeading}>Start Time: {timeFormat(session.startTime)}</Text>
                                {session.playerScore.map((player, pIndex) => (
                                    <View key={pIndex} >
                                        <Text style={styles.columnHeading}>Player{pIndex + 1}: {player.playerName}</Text>
                                        <Text style={styles.columnHeading}>Score: {player.score.join(', ')}</Text>
                                        <Text style={styles.columnHeading}>Total Score: {player.totalScore}</Text>
                                    </View>
                                ))}
                                <Text style={styles.columnHeading}>End Time: {timeFormat(session.endTime)}</Text>
                            </View>
                        </View>
                    )) : <Text style={styles.columnHeading}>No game history found</Text>}
                </View>
                </ScrollView>

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
    scoreContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: 16,
        marginTop: 16,
        marginBottom: 48,
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