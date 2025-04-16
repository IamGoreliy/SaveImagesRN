import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ButtonOpenSearchMenu = ({statusButton, toggler}) => {
    return (
        <View style={stylingButton.buttonWrapper(statusButton)}>
            <TouchableOpacity onPress={() => toggler()}>
                <View style={stylingButton.button}>
                    <Text style={stylingButton.buttonLabel(statusButton)}>
                        { statusButton ?  <MaterialIcons name="arrow-forward-ios" size={44} color="white"/> : <MaterialIcons name="arrow-forward-ios" size={44} color="black"/> }
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const stylingButton = StyleSheet.create({
    buttonWrapper: (status) =>  ({
        position: "absolute",
        top: status ? 40 : 0,
        left: 0,
    }),
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