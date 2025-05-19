import {View, StyleSheet, Image, Text} from "react-native";
import Animated, {useSharedValue, useAnimatedStyle, withTiming, withSpring} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import DeleteBtnEmoji from "../../../utils/DeleteBtnEmoji";


const RenderEmoji = ({emojiImage, handlerDelete, id}) => {
    const moveX = useSharedValue(100);
    const moveY = useSharedValue(100);
    const emojiScale = useSharedValue(1);
    const saveEmojiScale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);
    const selectedEmoji = useSharedValue(44);
    const rotationPositionEmoji = useSharedValue(0);
    const saveRotation = useSharedValue(0);


    const dragEmoji = Gesture.Pan()
        .minPointers(1)
        .minDistance(10)
        .onChange(event => {
        moveX.value += event.changeX;
        moveY.value += event.changeY;
    });

    const doubleTapToIncrease = Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(1000)
        .onEnd(() => {
            selectedEmoji.value = selectedEmoji.value === 44 ? 84 : 44;
        });

    const rotateGesture = Gesture.Rotation()
        .onUpdate(event => {
            rotationPositionEmoji.value = saveRotation.value + event.rotation;
        })
        .onEnd(() => {
            saveRotation.value = rotationPositionEmoji.value;
        })

    const pinchGesture = Gesture.Pinch()
        .onUpdate(event => {
            emojiScale.value = saveEmojiScale.value * event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        })
        .onEnd(() => {
            saveEmojiScale.value = emojiScale.value;
            if (emojiScale.value < 0.5) {
                emojiScale.value = withSpring(0.5, {duration: 300})
                saveEmojiScale.value = 0.5;
            } else if (emojiScale.value > 3) {
                emojiScale.value = withSpring(3, {duration: 300});
                saveEmojiScale.value = 3;
            }
        });

    const moveAndScaleEmojiStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: moveX.value},
                {translateY: moveY.value},
                {scale: emojiScale.value},
                {rotate: `${rotationPositionEmoji.value}rad`},
            ],
        }
    });



    const selectedEmojiStyle = useAnimatedStyle(() => {
        return {
            fontSize: selectedEmoji.value
        }
    })

    const composedGesture = Gesture.Simultaneous(doubleTapToIncrease, dragEmoji, pinchGesture, rotateGesture);

    const deleteEmoji = () => handlerDelete(id)

    return (
        <GestureDetector gesture={composedGesture}>

                 <Animated.View style={[
                     moveAndScaleEmojiStyle,
                     styling.emojiWrapper,
                 ]}>
                    <Animated.Text style={[
                        selectedEmojiStyle
                    ]}>
                        {emojiImage}
                    </Animated.Text>
                    <DeleteBtnEmoji handlerDelete={deleteEmoji}/>
                 </Animated.View>

         </GestureDetector>
    )
}

const styling = StyleSheet.create({
    emojiWrapper: {
        position: "absolute",
        flexDirection: "row",

    },
});

export default RenderEmoji;