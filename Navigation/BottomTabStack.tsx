
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainHomePage from '../Pages/MainHomePage';
import SignUpPage from '../Pages/SignUpPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'


const BottomTabStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


export function MainStack(){
    return(
        <Tab.Navigator 
        initialRouteName='Home' 
        screenOptions={({route}) =>({
        tabBarIcon: ({focused, color, size}) =>{
            let iconName;
            let rn= route.name;

            if (rn === 'Home'){
                iconName = 'home'
            }else if(rn === 'Sign Up'){
                iconName = 'person'
            }

            return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor: "#000000",
        headerBackgroundContainerStyle:{
            marginVertical: "-2%"
        },
        headerTitleStyle:{
            fontFamily:"Poppins-Bold",
            fontSize: 33
        },
        headerTitleContainerStyle:{
            marginBottom: "-2%"
        },
        tabBarStyle:{
            borderTopWidth:1,
            borderBlockColor:'grey',
            backgroundColor:"white",
            paddingTop: 15
        }
        })}
        
        >
            <BottomTabStack.Screen name="Home" component = {MainHomePage}/>
            <BottomTabStack.Screen name="Sign Up" component = {SignUpPage}/>
        </Tab.Navigator>
    )
}

