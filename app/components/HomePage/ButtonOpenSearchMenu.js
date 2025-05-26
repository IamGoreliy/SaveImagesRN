import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

const ButtonOpenSearchMenu = ({statusButton, toggler}) => {
    return (
        <View style={stylingButton.buttonWrapper(statusButton)}>
            <LinearGradient
                colors={['rgba(42, 123, 155, 1)', 'rgba(87, 199, 133, 1)', 'rgba(237, 221, 83, 1)']}
                style={stylingButton.linearGradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >
                <TouchableOpacity onPress={() => toggler()}>
                    <View style={stylingButton.button}>
                        <Text style={stylingButton.buttonLabel(statusButton)}>
                            { statusButton ?  <MaterialIcons name="arrow-forward-ios" size={44} color="white"/> : <MaterialIcons name="arrow-forward-ios" size={44} color="white"/> }
                        </Text>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const stylingButton = StyleSheet.create({
    buttonWrapper: (status) =>  ({
        position: "absolute",
        top: status ? 30 : 40,
        left: 0,
    }),
    linearGradient: {
        flex: 1,
        // paddingLeft: 15,
        // paddingRight: 15,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 2,
        borderColor: 'white'
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width: 40,
        height: 100,
        borderWidth: 1,
        borderColor: 'rgba(200, 200, 200 , 1)',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    buttonLabel: (statusButton) => ({
        transform: statusButton ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
    }),
})

export default ButtonOpenSearchMenu;