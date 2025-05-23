import {View, Text, StyleSheet, FlatList} from "react-native";
import {Image} from "expo-image";
import {useLocalSearchParams} from "expo-router";
import AuxiliaryButtonMenu from "./components/AuxiliaryButtonMenu";
import ModalEmoji from "./components/ModalEmoji";
import {createContext, useCallback, useRef, useState} from "react";
import RenderEmoji from "./components/RenderEmoji";
import EmojiPicker from "rn-emoji-keyboard";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ParseEmojiList from "./components/ParseEmojiList";
import {captureRef} from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import {saveImageFromMyGallery, sharedImage} from "../../utils/handlers";
import uuid from "react-native-uuid";


export const HandlerSideApiContext = createContext({});

const IdImage = () => {
    const {id, secondId, imgURL} = useLocalSearchParams();
    const [emojiIsOpen, setEmojiIsOpen] = useState(false);
    const [emoji, setEmoji] = useState([]);
    const sectionPictureRef = useRef(null);
    const [statusMedia, requestPermission] = MediaLibrary.usePermissions();

    const handlerAccessToMedia = () => saveImageFromMyGallery(sectionPictureRef, statusMedia, requestPermission, captureRef, MediaLibrary);
    const handlerShare = () => sharedImage(Sharing, captureRef, sectionPictureRef);


    const handlerOpenEmoji = useCallback(() => setEmojiIsOpen(prevState => !prevState), []);
    const handlerSaveEmoji = useCallback((emoji) => setEmoji(prevState => [...prevState, emoji]), []);
    const handlerDeleteEmoji = useCallback((id) => setEmoji(prevState => prevState.filter(ele => ele.id !== id)), []);


    return (
        <GestureHandlerRootView style={styling.container}>
            <HandlerSideApiContext.Provider value={{handlerDeleteEmoji}}>
                <View ref={sectionPictureRef} collapsable={false} style={styling.wrapperImage}>
                    <Image source={{uri: imgURL}} style={styling.image}/>
                    {emoji.length > 0 && <ParseEmojiList listEmoji={emoji}/>}
                </View>

                <AuxiliaryButtonMenu openEmoji={handlerOpenEmoji} screenshot={handlerAccessToMedia} shareImage={handlerShare}/>
                {/* это мое модальное окно которое я сделал но оказалось что есть библиотека такая же rn-emoji-keyboard используеться <EmojiPiker/> */}
                {/*<ModalEmoji emojiIsVisible={emojiIsOpen} handlerCloseModal={handlerOpenEmoji} handlerSaveEmoji={handlerSaveEmoji}/>*/}
                <View>
                     {emojiIsOpen && <EmojiPicker
                         open={emojiIsOpen}
                         onClose={() => setEmojiIsOpen(false)}
                         onEmojiSelected={element => handlerSaveEmoji({
                             id: uuid.v4(),
                             emoji: element.emoji,
                         })}
                         allowMultipleSelections={true}
                         onRequestClose={() => setEmojiIsOpen(false)}
                         styles={{container: styling.emojiPicker}}
                     />}
                </View>
            </HandlerSideApiContext.Provider>
        </GestureHandlerRootView>
    )
}

const styling = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    wrapperImage: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    emojiPicker: {

    }

})

export default IdImage;