import { View, StyleSheet, TextInput, Button, FlatList, Text, Image } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderLogo from '../components/HeaderLogo'

export default function GameScreen(players) {

    const route = useRoute(); // Get the route object from the navigation prop
    const { category } = route.params;  // Get the category parameter from the route object

    // we need to save the score of each player here
    // const saveData = async () => {
    //     try {
    //     // Add new name to the list
    //     const updatedNames = [...names, name];
    //     setScore(updatedNames);
    //     // Save the updated list to AsyncStorage
    //     await AsyncStorage.setItem('names', JSON.stringify(updatedNames));
    //     } catch (error) {
    //     console.error('Error saving data: ', error);
    //     }
    // };

    return (
      <View style={styles.bodyContainer}>
        <HeaderLogo />
        <View style={styles.container}>

            <View style={styles.columnHeadingsContainer}>
                <Text style={styles.columnHeading}>Hole 1</Text>
                <Text style={styles.columnHeading}>Score</Text>
            </View>

            <View style={styles.playersContainer}>
                <View style={styles.player}>
                    <Text style={styles.playerName}></Text>
                    {/* this is where people can input their score */}
                    {/* <TextInput
                        placeholder="0"
                        value={name}
                        onChangeText={(text) => setName(text)} /> */}
                    <TextInput style={styles.playerScore} placeholder="0" />
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
    borderRadius: 8
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