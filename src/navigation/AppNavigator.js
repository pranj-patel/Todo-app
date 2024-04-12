import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import AddNewTodoScreen from '../components/AddNewTodoScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddNewTodo" component={AddNewTodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
