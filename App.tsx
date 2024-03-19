import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUpPage from './Pages/SignUpPage';
import MainHomePage from './Pages/MainHomePage';

export default function App() {
  return (
    <View>
        <MainHomePage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
