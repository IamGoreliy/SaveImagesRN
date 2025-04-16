import {Modal, View, StyleSheet, TouchableOpacity, Animated, PanResponder, Platform, Text} from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import {useEffect, useRef, useState} from "react";
// import EmojiPicker  from "emoji-picker-react";
import EmojiPicker from "rn-emoji-keyboard";



const ModalEmoji = ({emojiIsVisible , handlerCloseModal, handlerSaveEmoji}) => {
    const [testEmoji, setTestEmoji] = useState(true);
    const [statusModalForAnimated, setStatusModalForAnimated] = useState(true);
    const modalStartPosition = useRef(new Animated.Value(500)).current;
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (event, gestureState) => {
                return gestureState.dy < 0;
            },
            onPanResponderMove: (event, gestureState) => {
                if (gestureState.dy > 0) {
                    pan.setValue({x: 0, y: gestureState.dy});
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dy > 250) {
                    Animated.timing(pan, {
                        toValue: {x: 0, y: 100},
                        duration: 2000,
                        useNativeDriver: true,
                    }).start(handlerCloseModal);
                } else {
                   Animated.timing(pan, {
                       toValue: {x: 0, y: 0},
                       useNativeDriver: true,
                   }) .start();
                }
            }
        })
    ).current;

    useEffect(() => {
        if (emojiIsVisible) {
            setStatusModalForAnimated(true);
            Animated.timing(modalStartPosition, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }).start();
            pan.setValue({x: 0, y: 0});
        } else {
            Animated.timing(modalStartPosition, {
                toValue: 100,
                duration: 2000,
                useNativeDriver: true,
            }).start(() => setStatusModalForAnimated(false));
        }
    }, [emojiIsVisible]);

    return (
        <Modal
            animationType={'none'}
            transparent={true}
            visible={statusModalForAnimated}
        >
            <Animated.View
                style={[
                    styling.container,
                    {
                        transform: [
                            {translateY: modalStartPosition},
                            {translateY: pan.y}
                        ]
                    }
                ]}
                {...panResponder.panHandlers}
            >
                <View style={styling.btn}>
                    <TouchableOpacity onPress={handlerCloseModal}>
                         <Fontisto name="close-a" size={34} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styling.wrapperEmoji}>
                    {/*{Platform.OS === 'web'*/}
                    {/*    && <EmojiPicker*/}
                    {/*        onEmojiClick={emoji => handlerSaveEmoji(emoji.imageUrl)}*/}
                    {/*    />*/}
                    {/*}*/}
                    {/*<EmojiPicker open={emojiIsVisible} onClose={handlerCloseModal} onEmojiSelected={element => handlerSaveEmoji(element.emoji)}/>*/}
                </View>
            </Animated.View>
        </Modal>
    )
}

const styling = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        borderTopWidth: 2,
        borderColor: 'rgb(194,250,207)',
    },
    btn: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    wrapperEmoji: {
        marginHorizontal: 'auto'
    },
    pickeStyle: {
        marginTop: 50,
        width: '100%',
        height: 400,
        fontSize: 24,

    }
})

export default ModalEmoji;