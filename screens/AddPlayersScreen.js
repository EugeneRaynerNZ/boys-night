import { View, StyleSheet, TextInput, Button, FlatList, Text, Image } from 'react-native'
import React, { Component } from 'react'

export default class CategoryScreen extends Component {
  render() {

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
      <View style={[styles.bodyContainer]}>
        
        {/* https://www.figma.com/proto/T9Rfeh6cCidjQpFoAActWy/Freejoas?page-id=3%3A3&type=design&node-id=701-345&viewport=-31182%2C-21929%2C1&t=i1bx1vF7nWUmqwA9-1&scaling=min-zoom&starting-point-node-id=302%3A2&mode=design */}
        
        {/* We want to be able to add and remove players from a list. The below code I have not tested */}

        <Button title="Add Name" onPress={saveData} />
      
        <TextInput
            placeholder="Enter a name"
            value={name}
            onChangeText={(text) => setName(text)}
        />

        <FlatList 
            data={names}
            renderItem={({ item }) => <Text style={styles.red}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#474747',
    flex: 1,
    display: "flex",
    padding: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 16
  },
  category: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 100,
    backgroundColor: '#555555',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'flex-start',
    padding: 32,
    rowGap: 16
  },
  categoryImage: {
    width: 40,
    height: 40
  },
  categoryText: {
    fontSize: 24,
    color: "white"
  }
});