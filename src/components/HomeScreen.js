import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import TodosContext from '../contexts/TodosContext';
import { styles } from '../utils/styles';
import FlashMessage, { showMessage } from 'react-native-flash-message';

function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { todos, setTodos } = React.useContext(TodosContext);
  const [isFinished, setIsFinished] = useState(Array(todos.length).fill(false));
  const [showDeleteIcon, setShowDeleteIcon] = useState(Array(todos.length).fill(false));
  const [showDescriptionIndex, setShowDescriptionIndex] = useState(null);

  useEffect(() => {
    if (route.params?.todoAdded) {
      showMessage({
        message: "Todo Added Successfully",
        type: "success",
        duration: 3000,
      });
    }
  }, [route.params?.todoAdded]);

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
        </View>
        {showDescriptionIndex === index && (
          <View>
            <Text style={[styles.todoDescription, isFinished[index] ? styles.finishedTodoDescription : null]}>
              {item.description}
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
    nestedScrollEnabled={true} // Enable nested scrolling for FlatList
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
