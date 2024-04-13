import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import TodosContext from '../contexts/TodosContext';
import { styles } from '../utils/styles';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { todos, setTodos } = React.useContext(TodosContext);

  const [isFinished, setIsFinished] = useState(() => todos.map(todo => false));
  const [showDeleteIcon, setShowDeleteIcon] = useState(() => todos.map(todo => false));
  const [showDescriptionIndex, setShowDescriptionIndex] = useState(null);

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error loading todos from AsyncStorage:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTodos();
    }, [])
  );

  useEffect(() => {
     AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleDescription = (index) => {
    setShowDescriptionIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const toggleFinished = (index) => {
    setTodos(prevState => {
      const newTodos = [...prevState];
      newTodos[index] = { ...newTodos[index], complete: true };
      return newTodos;
    });
  };

  const deleteTodo = (index) => {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  };


  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleDescription(index)} style={styles.todoItemContainer}>
      <View style={styles.todoNumberContainer}>
        <Text style={[styles.todoNumberText, styles.todoTitle]}>{index + 1}</Text>
      </View>
      <View style={styles.todoContent}>
        <View style={styles.todoTitleContainer}>
          <Text style={[styles.todoTitle, isFinished[index] ? styles.finishedTodoTitle : null]}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={() => toggleDescription(index)}>
            <Text style={styles.expandIcon}>{showDescriptionIndex === index ? <FontAwesome name="caret-up" size={20} /> : <FontAwesome name="caret-down" size={20}  />}</Text>
          </TouchableOpacity>
        </View>
        {showDescriptionIndex === index && (
          <View>
            <Text style={[styles.todoDescription, isFinished[index] ? styles.finishedTodoDescription : null]}>
              {item.description}
            </Text>

            {item.complete === true ?
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => deleteTodo(index)}>
                  <FontAwesome name="trash-o" size={20} color="red" style={styles.todoIcon} />
                </TouchableOpacity>
              </View>
              :
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => toggleFinished(index)}>
                  <FontAwesome
                    name={isFinished[index] ? 'check-circle' : 'circle-o'}
                    size={20}
                    color={isFinished[index] ? '#2ECC71' : '#AD88C6'}
                    style={styles.todoIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(index)}>
                  <FontAwesome name="trash-o" size={20} color="red" style={styles.todoIcon} />
                </TouchableOpacity>
              </View>
            }

          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNewTodo')}
      >
        <FontAwesome name="plus" size={20} color="white" />
        <Text style={styles.addButtonText}>Add New Todo</Text>
      </TouchableOpacity>
      <FlashMessage position="top" />
    </View>
  );
}

export default HomeScreen;