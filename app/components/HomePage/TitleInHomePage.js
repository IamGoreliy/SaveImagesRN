import {Text, View, StyleSheet} from "react-native";
import {Image} from "expo-image";
import {useFonts, Sacramento_400Regular} from "@expo-google-fonts/sacramento";
import {LilitaOne_400Regular} from "@expo-google-fonts/lilita-one";

const TitleComponentPixabay = () => {
    return (
        <View style={stylingTitle.titleWrapper}>
            {['p', 'i', 'x', 'a', 'b', 'a', 'y'].map((ele, index) => {
                return (
                    <Text
                        key={index}
                        style={stylingTitle.titleLabelPixabay(index)}
                    >
                        {ele}
                    </Text>
                )
            })}
        </View>
    )
}

const TitleComponentPexels = () => {
    return (
        <View style={stylingTitle.wrapperLogo}>
            <Image
                source={require('../../../assets/logo/pexelByGPTInActive.png')}
                style={stylingTitle.logo}
            />
        </View>
    )
}

//old version
// const TitleComponentPexels = () => {
//     return (
//         <View style={stylingTitle.titleWrapper}>
//             <Text style={stylingTitle.titleLabelPexels}>
//                 Pexels
//             </Text>
//         </View>
//     )
// }

const colorForPixabay = {
    0: 'rgba(255, 0, 0, 1 )',
    1: 'rgba(0, 153, 255, 1)',
    2: 'rgba(0, 51, 153, 1)',
    3: 'rgba(0, 204, 102, 1)',
    4: 'rgba(0, 102, 204, 1)',
    5: 'rgba(255, 204, 0, 1)',
    6: 'rgba(255, 255, 153, 1)',
};

const TitleInHomePage = ({namePage}) => {
    const [fontSLoaded] = useFonts({
        'Sacramento400': Sacramento_400Regular,
        'LilitaOne400': LilitaOne_400Regular,
    })

    if (!fontSLoaded) return null;

    return (
        <>
            {namePage === 'pexels' ? <TitleComponentPexels/> : <TitleComponentPixabay/>}
        </>
    )
}

const stylingTitle = StyleSheet.create({
    titleWrapper: {
        flexDirection: "row",
        justifyContent: 'center',
        width: '80%',
        marginHorizontal: 'auto',
        height: 78,
    },
    titleLabelPexels: {
        fontSize: 66,
        fontFamily: 'Sacramento400',
    },
    titleLabelPixabay: (index) => ({
        fontSize: 68,
        fontFamily: 'LilitaOne400',
        color: colorForPixabay[index],
    }),
    wrapperLogo: {
        width: '100%',
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 350,
        height: '100%',
    }
})

export default TitleInHomePage;