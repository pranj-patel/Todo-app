import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

// Create a context to manage todos state
const TodosContext = React.createContext({
  todos: [],
  setTodos: () => {},
});

function HomeScreen() {
  const navigation = useNavigation();
  const { todos, setTodos } = React.useContext(TodosContext);
  const [isFinished, setIsFinished] = useState(Array(todos.length).fill(false));
  const [showDeleteIcon, setShowDeleteIcon] = useState(Array(todos.length).fill(false));
  const [showDescriptionIndex, setShowDescriptionIndex] = useState(null);

  const toggleDescription = (index) => {
    setShowDescriptionIndex(prevIndex => (prevIndex === index ? null : index));
    toggleDeleteIcon(index);
  };

  const toggleFinished = (index) => {
    setIsFinished(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const toggleDeleteIcon = (index) => {
    setShowDeleteIcon(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const deleteTodo = (index) => {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
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
              <View style={styles.todoNumberContainer}>
                <Text style={[styles.todoNumberText, styles.todoTitle]}>{index + 1}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleDescription(index)} style={styles.todoContent}>
                <View style={styles.todoTitleContainer}>
                  <Text style={[styles.todoTitle, isFinished[index] ? styles.finishedTodoTitle : null]}>
                    {todo.title}
                  </Text>
                </View>
                {showDescriptionIndex === index && (
                  <>
                    <Text style={[styles.todoDescription, isFinished[index] ? styles.finishedTodoDescription : null]}>
                      {todo.description}
                    </Text>
                    <View style={styles.iconsContainer}>
                      <TouchableOpacity onPress={() => toggleFinished(index)}>
                        <FontAwesome
                          name={isFinished[index] ? 'check-circle' : 'circle-o'}
                          size={20}
                          color={isFinished[index] ? '#2ECC71' : '#AD88C6'}
                          style={styles.todoIcon}
                        />
                      </TouchableOpacity>
                      {showDeleteIcon[index] && (
                        <TouchableOpacity onPress={() => deleteTodo(index)}>
                          <FontAwesome name="trash-o" size={20} color="red" style={styles.todoIcon} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNewTodo')}
      >
        <FontAwesome name="plus" size={20} color="white" />
        <Text style={styles.addButtonText}>Add New Todo</Text>
      </TouchableOpacity>
    </View>
  );  
}

function AddNewTodoScreen() {
  const navigation = useNavigation();
  const { setTodos } = React.useContext(TodosContext); // Access setTodos from context
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  const handleSave = () => {
    if (title.trim() === '' || description.trim() === '') {
      return;
    }

    // Update todos using setTodos from context
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
}

const Stack = createStackNavigator();

export default function App() {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddNewTodo" component={AddNewTodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodosContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6E6',
    alignItems: 'center',
    paddingTop: 2,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  topContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
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
    flexDirection: 'row', // Added flexDirection to align items horizontally
    alignItems: 'center', // Align items vertically centered
  },
  todoNumberContainer: {
    marginRight: 10, // Adjust the margin to your preference
    alignItems: 'flex-start',
  },
  todoTitleContainer: {
    flex: 1, // Take remaining space horizontally
  },
  todoNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#7469B6',
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#7469B6',
  },
  finishedTodoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ccc', // Change color for finished todo items
    textDecorationLine: 'line-through', // Add line-through style for finished todo items
  },
  todoDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#7469B6',
  },
  finishedTodoDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ccc', // Change color for finished todo items
    textDecorationLine: 'line-through', // Add line-through style for finished todo items
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  todoIcon: {
    marginLeft: 'auto', // Move the icon to the right edge
    marginHorizontal: 10, // Add horizontal margin for better spacing
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
    marginTop: 5,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
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
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: '#AD88C6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#2ECC71',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});
