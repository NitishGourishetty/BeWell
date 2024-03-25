import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import SignUpPage from './Pages/SignUpPage';
import MainHomePage from './Pages/MainHomePage';
import { useCustomFonts } from './assets/fonts/fontDeclarations';
import * as Font from 'expo-font';
import { MainStack } from './Navigation/BottomTabStack';

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Font loading in progress
    return null; // or you can render a loading indicator
  }

  // Fonts are loaded, render your navigation
  return (

    <NavigationContainer>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <MainStack />
    </NavigationContainer>
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
