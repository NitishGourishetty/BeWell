import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainHomePage from '../Pages/MainHomeModules/MainHomePage';
import LoginPage from '../Pages/LoginPage';
import { Ionicons } from '@expo/vector-icons'
import FriendsListPage from '../Pages/FriendsModule/FriendsListPage';
import ProfilePicturePage from '../Pages/SignUpFlowPages/ProfilePicturePage';
import NamePage from '../Pages/SignUpFlowPages/NamePage';
import UserPwdPage from '../Pages/SignUpFlowPages/UserPwdPage';
import Account from '../Pages/NotInUse/TempAccountPage';
import SetGoalsPage from '../Pages/SignUpFlowPages/SetGoalsPage';
import GoalSetupPage from '../Pages/SignUpFlowPages/GoalSetupPage';
import TimePage from '../Pages/SignUpFlowPages/TimePage';
import PrivacySetupPage from '../Pages/SignUpFlowPages/PrivacySetupPage';
import { MainStack } from '../Navigation/BottomTabStack';



const signUpFlow = createNativeStackNavigator();

export default function SignUpStack() {
    return (
        <signUpFlow.Navigator screenOptions={{ animationTypeForReplace: "pop", headerShown: false }}>
            <signUpFlow.Screen name={"Login"} component={LoginPage} />
            <signUpFlow.Screen name={"Sign Up"} component={UserPwdPage} />
            <signUpFlow.Screen name={"Name"} component={NamePage} />
            <signUpFlow.Screen name={"Profile Picture"} component={ProfilePicturePage} />
            <signUpFlow.Screen name={"SetGoals"} component={SetGoalsPage} />
            <signUpFlow.Screen name={"GoalSetup"} component={GoalSetupPage} />
            <signUpFlow.Screen name={"TimePage"} component={TimePage} />
            <signUpFlow.Screen name={"PrivacySetup"} component={PrivacySetupPage} />
            <signUpFlow.Screen name={"MainStack"} component={MainStack} />
        </signUpFlow.Navigator>
    )
}
