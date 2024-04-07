
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainHomePage from '../pages/MainHomePage';
import SignUpPage from '../pages/SignUpPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import FriendsListPage from '../pages/FriendsModule/FriendsListPage';
import TempSignUpPage from '../pages/TempSignUp';

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
                    else if (rn === 'Sign Up') {
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
            <BottomTabStack.Screen name="Sign Up" component={SignUpPage} />
            <BottomTabStack.Screen name="Friends" component={FriendsListPage} />
            <BottomTabStack.Screen name="Testing" component={TempSignUpPage} />
        </Tab.Navigator>
    )
}

