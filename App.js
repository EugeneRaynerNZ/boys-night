import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);

  useEffect(() => {
    // Retrieve names from AsyncStorage when component mounts
    retrieveData();
  }, []);

  const saveData = async () => {
    try {
      // Add new name to the list
      const updatedNames = [...names, name];
      setNames(updatedNames);
      // Save the updated list to AsyncStorage
      await AsyncStorage.setItem('names', JSON.stringify(updatedNames));
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  const retrieveData = async () => {
    try {
      // Retrieve names from AsyncStorage
      const storedNames = await AsyncStorage.getItem('names');
      if (storedNames !== null) {
        // Parse retrieved data and set it in state
        setNames(JSON.parse(storedNames));
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  return (
    <View style={styles.bodyContainer}>

      <View style={styles.homeTitle}>
       <Image source={require('./assets/login-logo2.png')} style={styles.homeTitleImage} />
      </View>

      {/* this button should navigate to a new screen where you can choose a category. design as per below */}
      {/* https://www.figma.com/proto/T9Rfeh6cCidjQpFoAActWy/Freejoas?page-id=3%3A3&type=design&node-id=701-232&viewport=-31182%2C-21929%2C1&t=T8GffSJSXEySO10X-1&scaling=min-zoom&starting-point-node-id=302%3A2&mode=design */}
      <View style={styles.homeButtons}>
        <Button title="Get started" />
      </View>
      
      {/* <Button style={styles.red} title="Add Name" onPress={saveData} /> */}
      

      {/* <TextInput
        placeholder="Enter a name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <FlatList 
        data={names}
        renderItem={({ item }) => <Text style={styles.red}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#474747',
    flex: 1,
    display: "flex",
    padding: 20,
    gap: 48
  }, 
  homeTitle: {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },
  homeTitleImage: {
    width: "100%",
    height: 74
  },
  homeButtons: {
    display: "flex",
    gap: 8,
    height: 50
  },
  red: {
    color: 'red',
  },
});

export default App;
