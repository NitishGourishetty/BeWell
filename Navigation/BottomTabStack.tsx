
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainHomePage from '../Pages/MainHomePage';
import LoginPage from '../Pages/LoginPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import FriendsListPage from '../Pages/FriendsModule/FriendsListPage';
import ProfilePicturePage from '../Pages/ProfilePicturePage';
import TempSignUpPage from '../Pages/TempSignUp';


const BottomTabStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


export function MainStack() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === 'Home') {
                        iconName = 'home'
                    }
                    else if (rn === 'Login') {
                        iconName = 'person'
                    }
                    else if (rn === 'Testing') {
                        iconName = 'hammer'
                    }
                    else if (rn === 'Friends') {
                        iconName = "person-add"
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: "#000000",
                headerBackgroundContainerStyle: {
                    marginVertical: "-2%"
                },
                headerTitleStyle: {
                    fontFamily: "Poppins-Bold",
                    fontSize: 33
                },
                headerTitleContainerStyle: {
                    marginBottom: "-2%"
                },
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderBlockColor: 'grey',
                    backgroundColor: "white",

                }
            })}
        >
            <BottomTabStack.Screen name="Home" component={MainHomePage} />
            <BottomTabStack.Screen name="Login" component={LoginPage} />
            <BottomTabStack.Screen name="Friends" component={FriendsListPage} />
            <BottomTabStack.Screen name="Testing" component={TempSignUpPage} />
        </Tab.Navigator>
    )
}

