import { StyleSheet, Text, View, Switch, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants';
import Button from '../components/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { toggleTodo, updateTodo } from '../redux/features/todo/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const { todoDetails } = route.params;
  const todo = useSelector(state => state.todos.todos.find(t => t.id === todoDetails.id));
  
  const [isEditing, setIsEditing] = useState(false);
  const [newDetails, setNewDetails] = useState(todo.details || '');
  
  const handleEditTodo = () => {
    if (isEditing) {
      dispatch(updateTodo({ id: todo.id, details: newDetails }));
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { dispatch(toggleTodo(todoDetails.id)); }} style={styles.toggleButton}>
        <MaterialCommunityIcons
          name={todo.completed ? "checkbox-marked" : "checkbox-blank-outline"}
          size={24}
          color={todo.completed ? COLORS.GREEN : COLORS.DARK}
        />
        <Text style={styles.text}>
          {todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleEditTodo} style={[styles.toggleButton, { marginTop: 16 }]}>
        <MaterialCommunityIcons
          name={isEditing ? "content-save-outline" : "file-document-edit-outline"}
          size={24}
          color={COLORS.DARK}
        />
        <Text style={styles.text}>
          {isEditing ? 'Update' : 'Edit'}
        </Text>
      </TouchableOpacity>
      
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={newDetails}
          onChangeText={setNewDetails}
          multiline
          placeholder="Enter todo details"
          autoFocus
        />
      ) : (
        <Text style={styles.details}>{todo.details || 'No details available.'}</Text>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.LIGHT,
  },
  details: {
    fontSize: 16,
    color: COLORS.DARK,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.DARK,
  },
  input: {
    fontSize: 16,
    color: COLORS.DARK,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 5,
    backgroundColor: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
  }
});