import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


const AuxiliaryButton = ({btnLabel, handler, stylingBtn}) => {
    return (
        <TouchableOpacity onPress={handler}>
            <Text style={stylingBtn}>
                {btnLabel}
            </Text>
        </TouchableOpacity>
    )
}

const AuxiliaryButtonMenu = ({openEmoji, screenshot, shareImage}) => {
    return (
        <View style={styling.container}>
            <View style={styling.btnWrapper}>
                <AuxiliaryButton
                    stylingBtn={styling.btn(true)}
                    btnLabel={<MaterialIcons name="save-alt" size={44} color="black" />}
                    handler={screenshot}
                />
                <AuxiliaryButton
                    stylingBtn={styling.btn(true)}
                    btnLabel={<MaterialCommunityIcons name="sticker-emoji" size={44} color="black" />}
                    handler={openEmoji}
                />
                <AuxiliaryButton
                    stylingBtn={styling.btn(true)}
                    btnLabel={<AntDesign name="sharealt" size={44} color="black" />}
                    handler={shareImage}
                />
            </View>
        </View>
    )
}

const styling = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        width: '100%',

    },
    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 'auto',
        backgroundColor: 'rgba(190, 190, 190, 0.7)',
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgb(194,250,207)',
    },
    btn: (gapCol) => ({
        marginHorizontal: gapCol ? 20 : 0,
    })

})

export default AuxiliaryButtonMenu;