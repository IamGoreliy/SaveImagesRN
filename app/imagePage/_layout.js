import {Stack, useNavigation} from "expo-router";
import {Platform, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const StackLayout = () => {
    const navigation = useNavigation();
    return (
        <Stack
            screenOptions={{

            }}
        >
            <Stack.Screen
                name='[idImage]'
                options={{
                    title: 'Full Screen Image',
                    headerBackVisible: true,
                    ...(Platform.OS === 'ios' && {
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name='arrow-back' size={24} color={'black'}/>
                            </TouchableOpacity>
                        )
                    })
                }}
            />
        </Stack>
    )
}

export default StackLayout;