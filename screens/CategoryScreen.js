import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import GolfIcon from '../assets/golf.png'
import PoolIcon from '../assets/pool.png'

export default function CategoryScreen({ navigation }) {

  const handleGameSelection = (category) => {
    // navigate to the AddPlayers screen and pass the category as a parameter
    navigation.navigate('AddPlayers', { category });
  }

  return (
    <View style={[styles.bodyContainer]}>
      {/* if we click Golf, we should go to "add players screen" */}
      <View style={styles.category}>
        <TouchableOpacity onPress={() => handleGameSelection('Golf')}>
          <Image source={GolfIcon} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Golf</Text>
        </TouchableOpacity>
      </View>
      {/* if we click Pool, we should go to "add players screen" */}
      <View style={styles.category}>
        <TouchableOpacity onPress={() => handleGameSelection('Pool')}>
          <Image source={PoolIcon} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Pool</Text>
        </TouchableOpacity>
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