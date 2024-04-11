import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
