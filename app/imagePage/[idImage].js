import {View, Text, StyleSheet, FlatList} from "react-native";
import {Image} from "expo-image";
import {useLocalSearchParams} from "expo-router";
import AuxiliaryButtonMenu from "./components/AuxiliaryButtonMenu";
import ModalEmoji from "./components/ModalEmoji";
import {useCallback, useState} from "react";
import RenderEmoji from "./components/RenderEmoji";
import EmojiPicker from "rn-emoji-keyboard";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ParseEmojiList from "./components/ParseEmojiList";

const IdImage = () => {
    const {id, secondId, imgURL} = useLocalSearchParams();
    const [emojiIsOpen, setEmojiIsOpen] = useState(false);
    const [emoji, setEmoji] = useState([]);

    console.log('emoji', emoji)

    const handlerOpenEmoji = useCallback(() => setEmojiIsOpen(prevState => !prevState), []);
    const handlerSaveEmoji = useCallback((emoji) => setEmoji(prevState => [...prevState, emoji]), []);

    return (
        <GestureHandlerRootView style={styling.container}>
            <View style={styling.wrapperImage}>
                <Image source={{uri: imgURL}} style={styling.image}/>
                {emoji.length > 0 && <ParseEmojiList listEmoji={emoji}/>}
            </View>
            <AuxiliaryButtonMenu openEmoji={handlerOpenEmoji}/>
            {/* это мое модальное окно которое я сделал но оказалось что есть библиотека такая же rn-emoji-keyboard используеться <EmojiPiker/> */}
            {/*<ModalEmoji emojiIsVisible={emojiIsOpen} handlerCloseModal={handlerOpenEmoji} handlerSaveEmoji={handlerSaveEmoji}/>*/}
            <View>
                 {emojiIsOpen && <EmojiPicker open={emojiIsOpen} onClose={() => setEmojiIsOpen(false)} onEmojiSelected={element => handlerSaveEmoji(element.emoji)} allowMultipleSelections={true} onRequestClose={() => setEmojiIsOpen(false)} styles={{container: styling.emojiPicker}}/>}
            </View>
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