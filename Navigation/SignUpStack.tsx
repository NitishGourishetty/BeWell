import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainHomePage from '../Pages/MainHomePage';
import LoginPage from '../Pages/LoginPage';
import { Ionicons } from '@expo/vector-icons'
import FriendsListPage from '../Pages/FriendsModule/FriendsListPage';
import ProfilePicturePage from '../Pages/ProfilePicturePage';
import NamePage from '../Pages/NamePage';
import SignUpPage from '../Pages/SignUpPage';
import Account from '../Pages/TempAccountPage';

const signUpFlow = createNativeStackNavigator();

export default function SignUpStack() {
    return (
        <signUpFlow.Navigator screenOptions={{ animationTypeForReplace: "pop" }}>
            <signUpFlow.Screen name={"Login"} component={LoginPage} />
            <signUpFlow.Screen name={"Sign Up"} component={Account} />
            <signUpFlow.Screen name={"Name"} component={NamePage} />
            <signUpFlow.Screen name={"Profile Picture"} component={ProfilePicturePage} />
        </signUpFlow.Navigator>
    )
}
