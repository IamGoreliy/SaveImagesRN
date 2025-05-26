import {Stack} from "expo-router";
import {View, StyleSheet, ImageBackground, StatusBar} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const RootLayout = () => {
    return (
        // <ImageBackground
        //     source={require('../assets/splashscreen.png')}
        //     style={styling.container}
        // >
        <View style={styling.container}>
            <LinearGradient
                colors={['rgba(42, 123, 155, 1)', 'rgba(87, 199, 133, 1)', 'rgba(237, 221, 83, 1)']} // Ваши цвета градиента
                style={styling.containerStatusBarGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content" // Или "light-content" в зависимости от фона
                />
            </LinearGradient>
            <Stack>
                <Stack.Screen
                    name='(tabs)'
                    options={{
                   headerShown: false,
                   contentStyle: { backgroundColor: "transparent" },
                }}/>
                <Stack.Screen
                    name={'imagePage'}
                    options={{
                        headerShown: false,
                        contentStyle: { backgroundColor: "transparent" },
                }}
                />
                <Stack.Screen name='+not-found'/>
            </Stack>
        </View>
        // </ImageBackground>
    )
}

const styling = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    containerStatusBarGradient: {
        height: StatusBar.currentHeight
    },
})

export default RootLayout;