import React, { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import TodosContext from './src/contexts/TodosContext';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <AppNavigator />
    </TodosContext.Provider>
  );
}
