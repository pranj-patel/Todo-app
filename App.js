import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

function HomeScreen({ todos, setTodos }) {
  const navigation = useNavigation();

  const [showDescription, setShowDescription] = useState(Array(todos.length).fill(false));

  const toggleDescription = (index) => {
    setShowDescription(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>My Todo List</Text>
          <View style={styles.titleLine} />
          {todos.map((todo, index) => (
            <View key={index} style={styles.todoItemContainer}>
              <TouchableOpacity onPress={() => toggleDescription(index)}>
                <Text style={styles.todoTitle}>{todo.title}</Text>
              </TouchableOpacity>
              {showDescription[index] && (
                <View>
                  <Text style={styles.todoDescription}>{todo.description}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNewTodo', { setTodos })}
      >
        <FontAwesome name="plus" size={20} color="white" />
        <Text style={styles.addButtonText}>Add New Todo</Text>
      </TouchableOpacity>
    </View>
  );
}


const AddNewTodoScreen = React.forwardRef(({ navigation, route }, ref) => {
  const { setTodos } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  const handleSave = () => {
    if (title.trim() === '' || description.trim() === '') {
      return;
    }
  
    // Update the parent component's state with the new todo
    setTodos(prevTodos => [...prevTodos, { title, description }]);
    
    navigation.navigate('Home'); // Navigate back to the home page
  
    Toast.show({
      type: 'success',
      text1: 'Todo Added Successfully',
      visibilityTime: 2000,
    });
  
    // Clear input fields
    setTitle('');
    setDescription('');
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Todo</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.multilineInput}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <FontAwesome name="times" size={20} color="white" />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <FontAwesome name="save" size={20} color="white" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const Stack = createStackNavigator();

export default function App() {
  const [todos, setTodos] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} todos={todos} setTodos={setTodos} />}
        </Stack.Screen>
        <Stack.Screen name="AddNewTodo" component={AddNewTodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6E6',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  topContainer: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#7469b6',
  },
  titleLine: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#7469b6',
    marginBottom: 10,
  },
  todoItemContainer: {
    marginBottom: 20,
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#7469B6',
  },
  todoDescription: {
    fontSize:    16,
    marginBottom: 10,
    color: '#7469B6',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#AD88C6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#7469b6',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7469b6',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  multilineInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7469b6',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: '#AD88C6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#2ECC71',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

