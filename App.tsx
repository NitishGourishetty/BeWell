import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { MainStack } from './Navigation/BottomTabStack';
import SignUpStack from './Navigation/SignUpStack'
import TempSignUp from './Pages/NotInUse/TempSignUp'

import 'react-native-url-polyfill/auto'
import { supabase } from './lib/supabase'
import Auth from './Pages/NotInUse/TempSignUp'
import Account from './Pages/NotInUse/TempAccountPage'
import { Session } from '@supabase/supabase-js'
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/NotInUse/TempSignUp';

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  //session for user being logged in or not
  const [session, setSession] = useState<Session | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log("THIS IS SESSION", session)
      if (session) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  //font loading
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

  //LOGIN IS SCUFFED MAYBE USE SESSION DIFFERENTLY - NITISH -> SIGN OUT SHOULD NAVIGATE HOME THEN!!
  return (
    <>
      {
        loggedIn ?
          <NavigationContainer>
            <MainStack />
            <StatusBar translucent={true} backgroundColor="transparent" />
          </NavigationContainer>
          :
          <NavigationContainer>
            <SignUpStack />
          </NavigationContainer>
      }
    </>

    // <LoginPage></LoginPage>


    /* //if user not logged in forces them to auth page and only auth page, we can change this later
    //   <View>
    //   {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    // </View> */

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
