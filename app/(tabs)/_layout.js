import {Tabs} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import LinearGradient from "react-native-linear-gradient";


const TabLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    // headerShadowVisible:
                    headerShown: false,
                    tabBarBackground: () => (<LinearGradient
                        colors={['rgba(42, 123, 155, 1)', 'rgba(87, 199, 133, 1)', 'rgba(237, 221, 83, 1)']}
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    />),
                    tabBarActiveTintColor: '#05fcba',
                }}
            >
               <Tabs.Screen
                   name={'index'}
                   options={{
                       title: 'Home',
                       // tabBarIcon: ({color}) => (<FontAwesome5 name="home" size={24} color="#d8eb34" />),
                       tabBarIcon: ({color}) => (<FontAwesome5 name="home" size={24} color={color === '#05fcba' ? color : '#d8eb34'} />),
                       tabBarLabelStyle: {color: '#d8eb34'}
               }}
               />
               <Tabs.Screen
                   name={'gallery'}
                   options={{
                       title: 'My Gallery',
                       // tabBarIcon: ({color}) => (<FontAwesome5 name="camera-retro" size={24} color="#2b7d9a" />),
                       tabBarIcon: ({color = '#2b7d9a'}) => (<FontAwesome5 name="camera-retro" size={24} color={color === '#05fcba' ? color : '#2b7d9a'} />),

                       tabBarLabelStyle: {color: '#2b7d9a'}
               }}
               />
            </Tabs>
        </>
    )
}

export default TabLayout;