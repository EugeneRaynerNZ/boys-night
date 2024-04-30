import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Category from './screens/CategoryScreen';
import AddPlayers from './screens/AddPlayersScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="AddPlayers" component={AddPlayers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
