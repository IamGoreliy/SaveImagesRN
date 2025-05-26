import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Animated,
    PanResponder,
    ImageBackground
} from "react-native";
import {Image} from "expo-image";
import {useEffect, useRef, useState} from "react";
import ButtonOpenSearchMenu from "./ButtonOpenSearchMenu";
import {useFonts, Sacramento_400Regular} from "@expo-google-fonts/sacramento";
import {LilitaOne_400Regular} from "@expo-google-fonts/lilita-one";
import {BlurView} from "expo-blur";
import LinearGradient from "react-native-linear-gradient";

const logoPexelsInActive = require('../../../assets/logo/pexelByGPTInActive.png');
const logoPexelsNotActive = require('../../../assets/logo/pexelByGPT.png');

const TitleComponentPixabay = ({stylingTitleWrapper, stylingTitle}) => {
    return (
        <View style={stylingTitleWrapper}>
            {['p', 'i', 'x', 'a', 'b', 'a', 'y'].map((ele, index) => {
                return (
                    <Text
                        key={index}
                        style={stylingTitle(index)}
                    >
                        {ele}
                    </Text>
                )
            })}
        </View>
    )
}

const colorForPixabay = {
    0: 'rgba(255, 0, 0, 1 )',
    1: 'rgba(0, 153, 255, 1)',
    2: 'rgba(0, 51, 153, 1)',
    3: 'rgba(0, 204, 102, 1)',
    4: 'rgba(0, 102, 204, 1)',
    5: 'rgba(255, 204, 0, 1)',
    6: 'rgba(255, 255, 153, 1)',
};


const ToggleButton = ({label, onPress, styling: {buttonSX, iconBtn, stylingWrapperPixabay, stylingTextPixabay, logoPexels}}) => {


       // //old version
       // const [fonts] = useFonts({
       //     'Sacramento': Sacramento_400Regular,
       //     'LilitaOne': LilitaOne_400Regular,
       // })

       // if (!fonts) return null;

       return (
            <TouchableOpacity
                onPress={() => onPress(label.toLowerCase())}
                style={buttonSX}
                pointerEvents="box-none"
            >
                    {label !== 'Pexels'
                        ? <TitleComponentPixabay stylingTitle={stylingTextPixabay} stylingTitleWrapper={stylingWrapperPixabay}/>
                        : <Image
                                source={logoPexels}
                                style={iconBtn}
                        />
                    }
            </TouchableOpacity>
       )
}

const SearchButton = ({toggler, searcher, resourseSelected, modalStatus, closeModal, searchInputValue}) => {
    const [statusModalForAnimation, setStatusModalForAnimation] = useState(true);
    const [recordInputValue, setRecordInputValue] = useState(searchInputValue ?? '');
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
                duration: 1000,
                useNativeDriver: true,
            }).start();
            pan.setValue({x: 0, y: 0});
        } else {
            Animated.timing(slidePosition, {
                toValue: -900,
                duration: 1000,
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
            <BlurView
                style={stylingHomePage.absoluteFill}
                intensity={100}
                tint="dark"
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
                    <ImageBackground
                        source={require('../../../assets/modalBG.png')}
                        blurRadius={15}
                        style={stylingHomePage.bgWrapper}
                        resizeMode={'cover'}
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
                            styling={{buttonSX: stylingHomePage.buttonSelectSite('pexels', resourseSelected), iconBtn: stylingHomePage.pexelsBtn, logoPexels: resourseSelected === 'pexels' ? logoPexelsInActive : logoPexelsNotActive}}
                        />
                        <ToggleButton
                            label={'Pixabay'}
                            onPress={toggler}
                            styling={{buttonSX: stylingHomePage.buttonSelectSite('pixabay', resourseSelected), stylingWrapperPixabay: stylingHomePage.titleWrapperPixabay, stylingTextPixabay: stylingHomePage.titleLabelPixabay}}
                        />
                    </View>
                    <View
                        style={stylingHomePage.inputWrapper}
                    >
                        <TextInput
                            style={stylingHomePage.input}
                            onChange={({nativeEvent: {text}}) => {
                                setRecordInputValue(text)
                                searcher(text)
                            }}
                            keyboardType='default'
                            placeholder={'поиск...'}
                            value={recordInputValue}
                        />
                    </View>
                    </ImageBackground>
                </Animated.View>
            </BlurView>
        </Modal>
    )
}

const stylingHomePage = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'red',
        // padding: 20,
        // paddingTop: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: 'white'
    },
    bgWrapper: {
        padding: 20,
        paddingTop: 40,

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
        backgroundColor: whatBtn !== btnName ? '#2b7c9b' : '#eadc54',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: whatBtn === btnName ? 'white' : 'transparent'
    }),
    // labelButton: {
    //     color: 'white',
    //     // textTransform: 'uppercase',
    //     fontSize: 24,
    //     fontFamily: 'LilitaOne',
    // },
    inputWrapper: {
        width: '85%',
        marginHorizontal: 'auto',
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgba(210, 210, 210, 1)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 5,
        height: 50,
    },
    input: {
        height: '100%',
        padding: 10,
    },
    absoluteFill: {
        ...StyleSheet.absoluteFillObject
    },
    pexelsBtn: {
        width: 120,
        height: 55,
    },
    titleWrapperPixabay: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        width: '80%',
        marginHorizontal: 'auto',
        height: 78,
    },
    titleLabelPixabay: (index) => ({
        color: colorForPixabay[index],
        // textTransform: 'uppercase',
        fontSize: 30,
        fontFamily: 'LilitaOne',
    }),
})

export default SearchButton;