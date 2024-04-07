import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainHomePage from '../Pages/MainHomePage';
import LoginPage from '../Pages/LoginPage';
import { Ionicons } from '@expo/vector-icons'
import FriendsListPage from '../Pages/FriendsModule/FriendsListPage';
import ProfilePicturePage from '../Pages/ProfilePicturePage';



const loginFlow = createNativeStackNavigator();

export default function LoginStack() {
    return (
        <loginFlow.Navigator>
            <loginFlow.Screen name={"LoginPage"} component={LoginPage} />
            <loginFlow.Screen name={"Friends"} component={FriendsListPage} />
            <loginFlow.Screen name={"ProfilePicture"} component={ProfilePicturePage} />
        </loginFlow.Navigator>
    )
}
