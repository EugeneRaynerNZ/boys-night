import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Logo from '../assets/logo.png'

function Home ({navigation}) {
  return (
    <View style={styles.bodyContainer}>

      <View style={styles.title}>
       <Image source={Logo} style={styles.logo} />
      </View>

      {/* this button should navigate to a new screen where you can choose a category. design as per below */}
      {/* https://www.figma.com/proto/T9Rfeh6cCidjQpFoAActWy/Freejoas?page-id=3%3A3&type=design&node-id=701-232&viewport=-31182%2C-21929%2C1&t=T8GffSJSXEySO10X-1&scaling=min-zoom&starting-point-node-id=302%3A2&mode=design */}
      <View style={styles.buttons}>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Category')}>
          <Text style={styles.primaryButtonText}>Start</Text>
        </TouchableOpacity>

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#060B43',
    flex: 1,
    display: "flex",
    padding: 20,
    gap: 48
  }, 
  title: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%"
  },
  logo: {
    width: 284,
  },
  buttons: {
    display: "flex",
    gap: 8,
    height: 50,
  },
  primaryButton: {
    borderRadius: 36,
    backgroundColor: "#0E34A0",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Home;
