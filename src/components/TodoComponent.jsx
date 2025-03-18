import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../components/Button'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const TodoComponent = ({ 
    item, 
    details, 
    handleExpand, 
    handleTodoPress, 
    handleDeleteTodo, 
    updateTodoDetails 
  }) => {
    const navigation=useNavigation();
    const searchedItem = useSelector(state => state.todos.todos.find(todo => todo.id === item.id));
    const [tempDetails, setTempDetails] = useState(item.details || '');

    const isExpanded = details[item.id] || false;

    function getDetails(item){
        console.log('>>>>',searchedItem)
        console.log('----',item)
    }

    function handleUpdate() {
        if (tempDetails.trim() !== '' && tempDetails !== item.details) {
            updateTodoDetails(item.id, tempDetails);
        }
    }
    
    return (
        <View style={styles.todoWrapper}>
            <View style={styles.todo}>
                <TouchableOpacity 
                    onPress={() => handleExpand(item.id)} 
                    style={styles.chevronContainer}
                >
                    <MaterialCommunityIcons 
                        name={isExpanded ? "chevron-down" : "chevron-right"} 
                        size={24} 
                        color={COLORS.DARK}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTodoPress(item)} style={styles.titleContainer}>
                    <MaterialCommunityIcons 
                        name={item.completed ? "checkbox-marked" : "checkbox-blank-outline"} 
                        size={24} 
                        color={item.completed? COLORS.GREEN : COLORS.DARK}
                    />
                    <Text style={[
                        styles.title, 
                        item.completed && styles.completedText
                    ]}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteContainer} onPress={() => handleDeleteTodo(item)}>
                    <MaterialCommunityIcons name="delete" size={32} color={COLORS.RED}/>
                </TouchableOpacity>
            </View>
            
            {isExpanded && (
                <View style={styles.detailsContainer}>
                    {!searchedItem.details && 
                        <><TextInput
                        style={styles.detailsInput}
                        multiline
                        placeholder="Add details..."
                        placeholderTextColor={COLORS.M_GREY}
                        value={item.details}
                        onChangeText={setTempDetails}
                    />
                    <Button
                        title={'Update'}
                        style={{width:'25%', alignSelf:'center'}}
                        disabled={tempDetails.trim() === '' || tempDetails === item.details}
                        onPress={handleUpdate}
                    />
                    </>}
                    
                            {searchedItem.details && <>
                            <TouchableOpacity onPress={()=>navigation.navigate('Details',{todoDetails:searchedItem})}>

                            <Text>{searchedItem.details}</Text>
                            </TouchableOpacity>
                            <Button
                                title="View Details"
                                style={{width:'34%',alignSelf:'center'}}
                                onPress={()=>navigation.navigate('Details',{todoDetails:searchedItem})}
                            />
                            </>}
                </View>
            )}
        </View>
    )
}

export default TodoComponent;

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.LIGHT,
        flex: 1,
        padding: 16,
        flexDirection: 'column', 
    },
    listContainer: {
        flex: 1,
    },
    heading:{
        color: COLORS.DARK,
        fontSize: 24,
        fontWeight: '600'
    },
    todoWrapper: {
        marginVertical: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    todo:{
        flex: 1,
        backgroundColor: COLORS.L_GREY,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
    },
    chevronContainer: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer:{
        padding: 16,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        gap: 8,
    },
    title:{
        color: COLORS.DARK,
        textDecorationLine: 'none',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: COLORS.DARK,
    },
    deleteContainer:{
        padding: 16,
    },
    detailsContainer: {
        backgroundColor: COLORS.LIGHT,
        borderWidth: 1,
        borderColor: COLORS.L_GREY,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 8,
        borderRadius:12,
    },
    detailsInput: {
        minHeight: 60,
        color: COLORS.DARK,
        padding: 8,
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingBottom: 4,
    },
    input: {
        flex: 1,
        borderColor: COLORS.GREEN,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
        height: 48,
    }, 
    addButton: {
        backgroundColor: COLORS.GREEN,
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
    },
    buttonText:{
        color: COLORS.LIGHT
    },
    detailsTextContainer: {
      marginTop: 8,
  },
  detailsText: {
      color: COLORS.DARK,
  },
  viewMoreText: {
      color: COLORS.GREEN,
      fontWeight: '600',
      marginTop: 4,
  },
})