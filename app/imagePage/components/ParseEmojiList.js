import RenderEmoji from "./RenderEmoji";
import {View, StyleSheet} from "react-native";
import {HandlerSideApiContext} from "../[idImage]";
import {useContext} from "react";


const ParseEmojiList = ({listEmoji}) => {
    const {handlerDeleteEmoji} = useContext(HandlerSideApiContext);
        return (
            <>
                {listEmoji.map((ele) => {
                    return (
                        <View key={ele.id} style={styling.containerEmoji}>
                             <RenderEmoji handlerDelete={handlerDeleteEmoji} emojiImage={ele.emoji} id={ele.id}/>
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

export default ParseEmojiList;