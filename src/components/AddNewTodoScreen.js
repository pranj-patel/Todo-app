import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TodosContext from '../contexts/TodosContext';
import { showMessage } from "react-native-flash-message";
import { styles } from '../utils/styles';

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

    // Show flash message notification
    showMessage({
      message: "Todo Added Successfully",
      type: "success",
      duration: 3000,
    });

    // Navigate back to the home page with a parameter indicating success
    navigation.navigate('Home', { todoAdded: true });
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

export default AddNewTodoScreen;
