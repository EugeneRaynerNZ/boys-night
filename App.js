import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Category from './screens/CategoryScreen';
import AddPlayers from './screens/AddPlayersScreen';
import GameScreen from './screens/GameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Welcome to Boys Night'}} />
        <Stack.Screen name="Category" component={Category} options={{title:'Game Selection'}} />
        <Stack.Screen name="AddPlayers" component={AddPlayers} options={{title:'Add Players'}}/>
        <Stack.Screen name="Game" component={GameScreen} options={{title:'Game'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
