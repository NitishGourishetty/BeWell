import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainHomePage from '../Pages/MainHomeModules/MainHomePage';
import LoginPage from '../Pages/LoginPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import FriendsListPage from '../Pages/FriendsModule/FriendsListPage';
import PrivacySetupPage from '../Pages/SignUpFlowPages/PrivacySetupPage';
import SetGoalsPage from '../Pages/SignUpFlowPages/SetGoalsPage';
import TimePage from '../Pages/SignUpFlowPages/TimePage';
import GoalSetupPage from '../Pages/SignUpFlowPages/GoalSetupPage';
import UserPwdPage from '../Pages/SignUpFlowPages/UserPwdPage';

import ProfilePicturePage from '../Pages/SignUpFlowPages/ProfilePicturePage';
import TempSignUpPage from '../Pages/NotInUse/TempSignUp';
import Account from '../Pages/NotInUse/TempAccountPage';
import { Session } from '@supabase/supabase-js'
import Feed from '../Pages/BeWellFeed/Feed';


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
<<<<<<< HEAD
            <BottomTabStack.Screen name="Feed" component={Feed} />
            <BottomTabStack.Screen name="Testing" component={UserPwdPage} />
=======
            <BottomTabStack.Screen name="Friends" component={FriendsListPage} />
            <BottomTabStack.Screen name="Testing" component={Account} />
>>>>>>> cc18b3c9c0652e3b49054a84fbd1b4bce6490a82
        </Tab.Navigator>
    )
}
