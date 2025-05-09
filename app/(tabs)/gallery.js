import {View, Text, StyleSheet} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Image} from "expo-image";
import {useCallback, useRef, useState} from "react";
import AuxiliaryButtonsGallery from "../components/MyGalleryPage/AuxiliaryButtonsGallery";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary  from "expo-media-library";
import * as Sharing from 'expo-sharing';
import {captureRef} from "react-native-view-shot";
import {handlerOpenGallery, handlerOpenCamera, sharedImage, saveImageFromMyGallery} from "../../utils/handlers";
import EmojiPicker from "rn-emoji-keyboard";
import ParseEmojiList from "../imagePage/components/ParseEmojiList";

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



    return (
        <GestureHandlerRootView style={styling.container}>
                <View ref={imageRef} collapsable={false} style={styling.wrapperImage}>
                     {!!imgUser && <Image source={{uri: imgUser}} style={styling.userImg} />}
                     {listEmoji.length > 0 && <ParseEmojiList listEmoji={listEmoji}/>}
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
                    {openEmoji && <EmojiPicker open={openEmoji} onClose={toggleEmoji} onEmojiSelected={element => saveEmoji(element.emoji)}/>}
                </View>
        </GestureHandlerRootView>
    )
}

const styling = StyleSheet.create({
    container: {
        position: "relative",
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
