import {View, StyleSheet, Image, Text} from "react-native";
import Animated, {useSharedValue, useAnimatedStyle} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";


const RenderEmoji = ({emojiImage}) => {
    const moveX = useSharedValue(100);
    const moveY = useSharedValue(100);


    const dragEmoji = Gesture.Pan().onChange(event => {
        moveX.value += event.changeX;
        moveY.value += event.changeY;
    });

    const moveEmojiStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: moveX.value},
                {translateY: moveY.value},
            ]
        }
    });

    return (
        <GestureDetector gesture={dragEmoji}>
            <Animated.View style={[
                moveEmojiStyle,
                styling.emojiWrapper,
            ]}>
                <Text style={styling.emojiImage}>
                    {emojiImage}
                </Text>
             </Animated.View>
         </GestureDetector>
    )
}

const styling = StyleSheet.create({
    emojiWrapper: {
        position: "absolute",

    },
    emojiImage: {
        fontSize: 44,
    },
});

export default RenderEmoji;