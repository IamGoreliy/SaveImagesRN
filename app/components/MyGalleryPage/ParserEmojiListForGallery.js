import RenderEmoji from "../../imagePage/components/RenderEmoji";
import {StyleSheet, View} from "react-native";
import {useContext} from 'react';
import {HandlersContext} from "../../(tabs)/gallery";
import DeleteBtnEmoji from "../../../utils/DeleteBtnEmoji";

const ParserEmojiListForGallery = ({listEmoji}) => {
    const {deleteEmoji} = useContext(HandlersContext);
    return (
        <>
            {listEmoji.map(ele => {
                return (
                    <View key={ele.id} style={styling.containerEmoji}>
                        <RenderEmoji handlerDelete={deleteEmoji} emojiImage={ele.emoji} id={ele.id}/>
                    </View>
                )
            })}
        </>
    )
}

const styling = StyleSheet.create({
    containerEmoji: {
        position: "absolute",
    }
})

export default ParserEmojiListForGallery;