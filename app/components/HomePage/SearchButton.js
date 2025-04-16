import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, PanResponder} from "react-native";
import {useEffect, useRef, useState} from "react";
import ButtonOpenSearchMenu from "./ButtonOpenSearchMenu";
import {useFonts, Sacramento_400Regular} from "@expo-google-fonts/sacramento";
import {LilitaOne_400Regular} from "@expo-google-fonts/lilita-one";

const ToggleButton = ({label, onPress, styling: {buttonSX, labelSX}}) => {
       const [fonts] = useFonts({
           'Sacramento': Sacramento_400Regular,
           'LilitaOne': LilitaOne_400Regular,
       })

       if (!fonts) return null;

       return (
            <TouchableOpacity
                onPress={() => onPress(label.toLowerCase())}
                style={buttonSX}
                pointerEvents="box-none"
            >
                <Text style={
                    [
                        {
                            fontFamily: label === 'Pexels' ? 'Sacramento' : 'LilitaOne',
                        },
                        labelSX
                    ]}>
                    {label}
                </Text>
            </TouchableOpacity>
       )
}

const SearchButton = ({toggler, searcher, resourseSelected, modalStatus, closeModal}) => {
    const [statusModalForAnimation, setStatusModalForAnimation] = useState(true);
    const slidePosition = useRef(new Animated.Value(-900)).current;
    const pan = useRef(new Animated.ValueXY()).current;


    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (event, gestureState) => {
                return gestureState.dx < 0;
            },
            onPanResponderMove: (event, gestureState) => {
                pan.setValue({x: gestureState.dx, y: 0});
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx < -100) {
                    Animated.timing(pan, {
                        toValue: {x: -900, y: 0},
                        duration: 2000,
                        useNativeDriver: true,
                    }).start(() => closeModal());
                } else {
                    Animated.timing(pan, {
                        toValue: {x: 0, y: 0},
                        useNativeDriver: true,
                    }).start();
                }
            }
        })
    ).current;


    useEffect(() => {
        if (modalStatus) {
            setStatusModalForAnimation(true);
            Animated.timing(slidePosition, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }).start();
            pan.setValue({x: 0, y: 0});
        } else {
            Animated.timing(slidePosition, {
                toValue: -900,
                duration: 2000,
                useNativeDriver: true,
            }).start(() => setStatusModalForAnimation(false));

        }
    }, [modalStatus]);


    return (
        <Modal
            visible={statusModalForAnimation}
            transparent={true}
            animationType={'none'}
            onRequestClose={closeModal}
        >

            <Animated.View
                style={[
                    stylingHomePage.modalContainer,
                    {
                        transform: [
                            {translateX: slidePosition},
                            {translateX: pan.x},
                        ]
                    }
                ]}
                {...panResponder.panHandlers}
            >
                <ButtonOpenSearchMenu statusButton={true} toggler={closeModal}/>
                <View
                    style={
                        stylingHomePage.wrapper
                    }
                >
                    <ToggleButton
                        label={'Pexels'}
                        onPress={toggler}
                        styling={{buttonSX: stylingHomePage.buttonSelectSite('pexels', resourseSelected), labelSX: stylingHomePage.labelButton}}
                    />
                    <ToggleButton
                        label={'Pixabay'}
                        onPress={toggler}
                        styling={{buttonSX: stylingHomePage.buttonSelectSite('pixabay', resourseSelected), labelSX: stylingHomePage.labelButton}}
                    />
                </View>
                <View
                    style={stylingHomePage.inputWrapper}
                >
                    <TextInput
                        style={stylingHomePage.input}
                        onChange={({nativeEvent: {text}}) => searcher(text)}
                        keyboardType='default'
                        placeholder={'поиск...'}
                    />
                </View>
            </Animated.View>

        </Modal>
    )
}

const stylingHomePage = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'red',
        padding: 20,
        paddingTop: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    buttonSelectSite: (btnName, whatBtn) => ({
        flexBasis: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 150,
        height: 50,
        backgroundColor: whatBtn === btnName ? 'green' : 'rgb(14,220,82)',
        borderRadius: 12,
    }),
    labelButton: {
        color: 'white',
        // textTransform: 'uppercase',
        fontSize: 24,
    },
    inputWrapper: {
        width: '85%',
        marginHorizontal: 'auto',
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        height: 50,
    },
    input: {
        height: '100%',
        padding: 10,
    },
})

export default SearchButton;