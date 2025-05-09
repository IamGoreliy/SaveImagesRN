import {Tabs} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const TabLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    // headerShadowVisible:
                    headerShown: false,
                }}
            >
               <Tabs.Screen
                   name={'index'}
                   options={{
                       title: 'Home',
                       tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />
               }}
               />
               <Tabs.Screen
                   name={'gallery'}
                   options={{
                       title: 'My Gallery',
                       tabBarIcon: () => <FontAwesome5 name="camera-retro" size={24} color="black" />

               }}
               />
            </Tabs>
        </>
    )
}

export default TabLayout;