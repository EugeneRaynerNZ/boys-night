import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import LoginLogo from '../assets/login-logo2.png'

const Home = ({navigation}) => {
  return (
    <View style={styles.bodyContainer}>

      <View style={styles.title}>
       <Image source={LoginLogo} style={styles.titleImage} />
      </View>

      {/* this button should navigate to a new screen where you can choose a category. design as per below */}
      {/* https://www.figma.com/proto/T9Rfeh6cCidjQpFoAActWy/Freejoas?page-id=3%3A3&type=design&node-id=701-232&viewport=-31182%2C-21929%2C1&t=T8GffSJSXEySO10X-1&scaling=min-zoom&starting-point-node-id=302%3A2&mode=design */}
      <View style={styles.buttons}>
        <Button 
          title="Get started"
          onPress={() => navigation.navigate('Category')}
           />
      </View>
      
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
  title: {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },
  titleImage: {
    width: "100%",
    height: 74
  },
  buttons: {
    display: "flex",
    gap: 8,
    height: 50
  },
  red: {
    color: 'red',
  },
});

export default Home;
