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
import SetGoalsPage from '../Pages/SetGoalsPage';
import GoalSetupPage from '../Pages/GoalSetupPage';
import TimePage from '../Pages/TimePage';
import PrivacySetupPage from '../Pages/PrivacySetupPage';
import { MainStack } from '../Navigation/BottomTabStack';


const signUpFlow = createNativeStackNavigator();

export default function SignUpStack() {
    return (
        <signUpFlow.Navigator screenOptions={{ animationTypeForReplace: "pop" }}>
            <signUpFlow.Screen name={"Login"} component={LoginPage} />
            <signUpFlow.Screen name={"Sign Up"} component={SignUpPage} />
            <signUpFlow.Screen name={"Name"} component={NamePage} />
            <signUpFlow.Screen name={"Profile Picture"} component={ProfilePicturePage} />
            <signUpFlow.Screen name={"SetGoals"} component={SetGoalsPage} />
            <signUpFlow.Screen name={"GoalSetup"} component={GoalSetupPage} />
            <signUpFlow.Screen name={"TimePage"} component={TimePage} />
            <signUpFlow.Screen name={"PrivacySetup"} component={PrivacySetupPage} />
            <signUpFlow.Screen name ={"MainStack"} component={MainStack} />
        </signUpFlow.Navigator>
    )
}
