import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.Header}>
      <Text style={styles.Text}>Todo List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#483d8b',
    padding: 20,
    borderWidth: 3,
    borderColor: '#4b0082',
  },
  Text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f5f5f5',
    textAlign: 'center',
  },
});

export default Header;
