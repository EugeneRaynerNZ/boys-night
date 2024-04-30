import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import GolfIcon from '../assets/golf.png'
import PoolIcon from '../assets/pool.png'

export default class CategoryScreen extends Component {
  render() {
    return (
      <View style={[styles.bodyContainer]}>
        {/* if we click Golf, we should go to "add players screen" */}
        <View style={styles.category}>
          <Image source={GolfIcon} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Golf</Text>
        </View>
        {/* if we click Pool, we should go to "add players screen" */}
        <View style={styles.category}>
          <Image source={PoolIcon} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Pool</Text>
        </View>
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