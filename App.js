import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from './src/components/Header.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import initialTodos from './src/constants/todos.js';

const App = () => {
  const [text, onChangeText] = useState('');
  const [todos, setTodos] = useState(initialTodos);
  const loadTodos = () => {
    AsyncStorage.getItem('storedTodos')
      .then(data => {
        if (data !== null) {
          setTodos(JSON.parse(data));
        } else {
          AsyncStorage.setItem('storedTodos', JSON.stringify(initialTodos));
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    // AsyncStorage.removeItem('storedTodos');
    loadTodos();
  }, []);

  const setTodosAsLocal = savedTodos => {
    setTodos([...savedTodos]);
    AsyncStorage.setItem('storedTodos', JSON.stringify(savedTodos));
  };

  const pressHandler = () => {
    todos.push({key: 1, text: text});
    setTodosAsLocal(todos);
  };

  const removeTodos = index => {
    todos.splice(index, 1);
    setTodosAsLocal(todos);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => removeTodos(index)}>
        <Text style={styles.flatListItems}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View>
          <Header />
        </View>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Write New Todos..."
          />

          <TouchableOpacity
            onPress={() => pressHandler()}
            style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#e6e6fa',
  },
  text: {
    color: '#2f4f4f',
  },
  flatListItems: {
    padding: 10,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: '#faf0e6',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#4b0082',
    fontSize: 17,
  },
  button: {
    padding: 15,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: '#483d8b',
    borderWidth: 2,
    borderColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5f5f5',
    textAlign: 'center',
  },
  input: {
    padding: 15,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default App;
