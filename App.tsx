import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import SignUpPage from './pages/SignUpPage';
import MainHomePage from './pages/MainHomePage';
import { useCustomFonts } from './assets/fonts/fontDeclarations';
import * as Font from 'expo-font';
import { MainStack } from './Navigation/BottomTabStack';
import TempSignUp from './pages/TempSignUp'

import 'react-native-url-polyfill/auto'
import { supabase } from './lib/supabase'
import Auth from './pages/TempSignUp'
import Account from './pages/TempAccountPage'
import { Session } from '@supabase/supabase-js'

const Stack = createNativeStackNavigator()

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   async function loadFonts() {
  //     await Font.loadAsync({
  //       'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  //       'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  //       'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  //     });
  //     setFontsLoaded(true);
  //   }

  //   loadFonts();
  // }, []);

  // if (!fontsLoaded) {
  //   // Font loading in progress
  //   return null; // or you can render a loading indicator
  // }


  //session for user being logged in or not
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  // Fonts are loaded, render your navigation
  return (

    // <NavigationContainer>
    //   <MainStack />
    //   <StatusBar translucent={true} backgroundColor="transparent" />
    // </NavigationContainer>
    
    //if user not logged in forces them to auth page and only auth page, we can change this later
    <View>
    {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
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
