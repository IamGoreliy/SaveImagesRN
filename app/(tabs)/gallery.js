import {View, Text, StyleSheet, ImageBackground} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Image} from "expo-image";
import {useCallback, useRef, useState, createContext} from "react";
import AuxiliaryButtonsGallery from "../components/MyGalleryPage/AuxiliaryButtonsGallery";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary  from "expo-media-library";
import * as Sharing from 'expo-sharing';
import {captureRef} from "react-native-view-shot";
import {handlerOpenGallery, handlerOpenCamera, sharedImage, saveImageFromMyGallery} from "../../utils/handlers";
import EmojiPicker from "rn-emoji-keyboard";
import ParserEmojiListForGallery from "../components/MyGalleryPage/ParserEmojiListForGallery";
import uuid from 'react-native-uuid';

export const HandlersContext = createContext({});

const Gallery = () => {
    const [imgUser, setImgUser] = useState('');
    const [statusGallery, requestPermissionGallery] = ImagePicker.useMediaLibraryPermissions();
    const [statusCamera, requestPermissionCamera] = ImagePicker.useCameraPermissions();
    const [openEmoji, setOpenEmoji] = useState(false);
    const [listEmoji, setListEmoji] = useState([]);
    const imageRef = useRef(null);

    const openGallery = () => handlerOpenGallery(statusGallery, requestPermissionGallery, ImagePicker, setImgUser);
    const openCamera = () => handlerOpenCamera(statusCamera, requestPermissionCamera, ImagePicker, setImgUser);
    const clearSelectPhoto = () => setImgUser('');
    const saveImage = () => saveImageFromMyGallery(imageRef, statusGallery, requestPermissionGallery, captureRef, MediaLibrary);
    const shareImage = () => sharedImage(Sharing, captureRef, imageRef);
    const toggleEmoji = useCallback(() => setOpenEmoji(prevState => !prevState), []);
    const saveEmoji = useCallback(emoji => setListEmoji(prevState => [...prevState, emoji]), []);
    const deleteEmoji = useCallback((id) => setListEmoji(prevState => prevState.filter(ele => ele.id !== id)), []);




    return (
        <GestureHandlerRootView style={styling.container}>
            <HandlersContext.Provider value={{deleteEmoji}}>
                <ImageBackground
                    source={require('../../assets/splashscreen.png')}
                    style={styling.bgWrapper}
                >
                    <View ref={imageRef} collapsable={false} style={styling.wrapperImage}>
                         {!!imgUser && <Image source={{uri: imgUser}} style={styling.userImg} />}
                         {listEmoji.length > 0 && <ParserEmojiListForGallery listEmoji={listEmoji}/>}
                    </View>
                    <AuxiliaryButtonsGallery
                        isThereAPicture={!!imgUser}
                        handlerOpenCamera={openCamera}
                        handlerOpenGallery={openGallery}
                        handlerClearSelectPhoto={clearSelectPhoto}
                        handlerShareImage={shareImage}
                        handlerOpenEmoji={toggleEmoji}
                        handlerSaveImage={saveImage}
                    />
                    <View>
                        {openEmoji && <EmojiPicker
                            open={openEmoji}
                            onClose={toggleEmoji}
                            onEmojiSelected={element => saveEmoji({
                                id: uuid.v4(),
                                emoji: element.emoji
                            })}
                        />}
                    </View>
                </ImageBackground>
            </HandlersContext.Provider>
        </GestureHandlerRootView>
    )
}

const styling = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
    },
    bgWrapper: {
        flex: 1,
    },
    wrapperImage: {
        flex: 1,
    },
    userImg: {
        width: '100%',
        height: '100%',
    }
})

export default Gallery;
