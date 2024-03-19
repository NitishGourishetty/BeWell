import {useFonts} from 'expo-font'


export function useCustomFonts (){
    const fontsLoaded = useFonts({
        'Poppins-Regular': require('./Poppins-Regular.ttf'),
        'Poppins-Bold': require("./Poppins-Bold.ttf"),
        'proxima-nova-regular': require('./proxima-nova/proxima-nova-regular.otf'),
        'proxima-nova-bold' : require('./proxima-nova/proxima-nova-bold.otf'),
        'proxima-nova-semibold' : require('./proxima-nova/proxima-nova-semibold.otf'),
        'Poppins-SemiBold': require('./Poppins-SemiBold.ttf')
    })
    while (!fontsLoaded){}
    return fontsLoaded
}