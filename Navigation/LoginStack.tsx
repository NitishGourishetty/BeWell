import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainHomePage from '../Pages/MainHomeModules/MainHomePage';
import LoginPage from '../Pages/LoginPage';
import { Ionicons } from '@expo/vector-icons'
import FriendsListPage from '../Pages/FriendsModule/FriendsListPage';
import ProfilePicturePage from '../Pages/SignUpFlowPages/ProfilePicturePage';
import Account from '../Pages/NotInUse/TempAccountPage'
import { Session } from '@supabase/supabase-js'

const loginFlow = createNativeStackNavigator();


export default function LoginStack() {
    return (
        <loginFlow.Navigator>
            <loginFlow.Screen name={"LoginPage"} component={LoginPage} />
            <loginFlow.Screen name={"Friends"} component={Account} />
            <loginFlow.Screen name={"ProfilePicture"} component={ProfilePicturePage} />
        </loginFlow.Navigator>
    )
}
