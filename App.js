import React, {useEffect} from 'react';
import 'react-native-get-random-values';  // Required for generating unique IDs
import {Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameLoader from './components/games/GameLoader';
import HomeScreen from './screens/HomeScreen';
import Category from './screens/CategoryScreen';
import AddPlayers from './screens/AddPlayersScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    // Load the games from AsyncStorage
    const initializeGames = async () => {
      await GameLoader.getInstance().createDefaultGames();
      console.log('Games reload complete');
    }
    initializeGames();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Welcome to Boys Night'}} />
        {/* <Stack.Screen name="Category" component={Category} options={{title:'Game Selection'}} /> */}
        <Stack.Screen 
          name="Category" 
          component={Category} 
          options={({ navigation }) => ({
            title: 'Boys Night',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('History')}
                title="History"
              />
            ),
          })}
        />

        <Stack.Screen name="AddPlayers" component={AddPlayers} options={{title:'Add Players'}}/>
        <Stack.Screen name="Game" component={GameScreen} options={{title:'Game'}}/>
        <Stack.Screen name="GameOver" component={GameOverScreen} options={{title:'Game Over'}}/>
        <Stack.Screen name="History" component={HistoryScreen} options={{title:'History'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
