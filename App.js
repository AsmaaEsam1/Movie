import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import Store from './src/redux/Store';
import Movies from './src/screens/Movies';
import MovieDetails from './src/screens/MovieDetails';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Movies'>
          <Stack.Screen name='Movies' component={Movies} options={{ headerShown: false }} />
          <Stack.Screen name='MovieDetails' component={MovieDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};




export default App;
