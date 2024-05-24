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
import ProfilePage from '../Pages/ProfilePage';
import PostCaptionPage from '../Pages/PostCaptionPage';
import { Session } from '@supabase/supabase-js'
import SignUpStack from './SignUpStack';
import Feed from '../Pages/BeWellFeed/Feed';


const BottomTabStack = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function BottomTabs() {
    return (
        <BottomTabStack.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === 'Home') {
                        iconName = 'home';
                    }
                    else if (rn === 'Login') {
                        iconName = 'person';
                    }
                    else if (rn === 'Testing') {
                        iconName = 'hammer';
                    }
                    else if (rn === 'Friends') {
                        iconName = "group";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
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
                },
            })}
        >
            <BottomTabStack.Screen name="Home" component={MainHomePage} />
            <BottomTabStack.Screen name="Login" component={LoginPage} />
            <BottomTabStack.Screen name="Feed" component={Feed} />
            <BottomTabStack.Screen name="Testing" component={ProfilePage} />
        </BottomTabStack.Navigator>
    );
}

export function MainStack() {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="MainTabs" component={BottomTabs} />
            <RootStack.Screen name="PostCaptionPage" component={PostCaptionPage} />
        </RootStack.Navigator>
    );
}