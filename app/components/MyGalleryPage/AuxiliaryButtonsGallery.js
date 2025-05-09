import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CreateBtn = ({children, sx, handler}) => (
    <TouchableOpacity
        onPress={handler}
        style={sx}
    >
        <Text>
            {children}
        </Text>
    </TouchableOpacity>
)

const AuxiliaryButtonsGallery = ({
        isThereAPicture,
        handlerOpenCamera,
        handlerOpenGallery,
        handlerClearSelectPhoto,
        handlerShareImage,
        handlerOpenEmoji,
        handlerSaveImage
    }) => {

    if (isThereAPicture) {
        return (
            <View style={styling(isThereAPicture)?.container}>
                <CreateBtn
                    handler={handlerSaveImage}
                    sx={styling(isThereAPicture)?.wrapperBtn()}
                >
                    <MaterialIcons name="save-alt" size={44} color="black" />
                </CreateBtn>
                <CreateBtn
                    handler={handlerOpenEmoji}
                    sx={styling(isThereAPicture)?.wrapperBtn(true)}
                >
                    <MaterialCommunityIcons name="sticker-emoji" size={44} color="black" />
                </CreateBtn>
                <CreateBtn
                    handler={handlerShareImage}
                    sx={styling(isThereAPicture)?.wrapperBtn(true)}
                >
                    <AntDesign name="sharealt" size={44} color="black" />
                </CreateBtn>
                <CreateBtn
                    handler={handlerClearSelectPhoto}
                    sx={styling(isThereAPicture)?.wrapperBtn(true)}
                >
                    <MaterialIcons name="cleaning-services" size={44} color="black" />
                </CreateBtn>
            </View>
        )
    } else {
        return (
            <View style={styling(isThereAPicture)?.container}>
                <CreateBtn
                    handler={handlerOpenCamera}
                    sx={styling(isThereAPicture)?.wrapperBtn()}
                >
                    <MaterialIcons name="camera" size={54} color="black" />
                </CreateBtn>
                <CreateBtn
                    handler={handlerOpenGallery}
                    sx={styling(isThereAPicture)?.wrapperBtn(true)}>
                    <FontAwesome name="image" size={54} color="black" />
                </CreateBtn>
            </View>
        )
    }


}

const styling = StyleSheet.create( (userPicTrue) => {
    if (userPicTrue) {
        return {
            container: {
                position: 'absolute',
                flexDirection: "row",
                bottom: 20,
                left: '50%',
                padding: 10,
                transform: [
                    {translateX: '-50%'},
                ],
                borderWidth: 1,
                borderColor: 'rgba(210, 210, 210, 1)',
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
            },
            wrapperBtn: (speaking = false) => ({
                marginLeft: speaking ? 10 : 0,
            })
        }
    } else {
        return  {
            container: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [
                    {translateX: '-50%'},
                    {translateY: '-50%'},
                ],
                flexDirection: "column",
                width: '80%',
                height: '80%',
                padding: 5,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 4,
                justifyContent: 'space-between',
                backgroundColor: 'rgb(175,175,175)',
            },
            wrapperBtn: (speaking = false) => ({
                flexBasis: '49%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 4,
                backgroundColor: 'white',

            }),
        }
    }
})

export default AuxiliaryButtonsGallery;