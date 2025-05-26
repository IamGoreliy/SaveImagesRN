import {TouchableOpacity, StyleSheet, View} from "react-native";
import {placeholderImage} from "../(tabs)";
import {Image} from "expo-image";
import {Link, useRouter} from "expo-router";
import LinearGradient from "react-native-linear-gradient";

const DisplayImageWithRedirect = ({imgURL, id, index}) => {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push({
            pathname: '/imagePage/[idImage]',
            params: {id, secondId: index, imgURL},
        })}>
            <View style={styling.container(index)}>
                <LinearGradient
                    colors={['rgba(42, 123, 155, 1)', 'rgba(87, 199, 133, 1)', 'rgba(237, 221, 83, 1)']}
                    style={styling.gradientBorder}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    <Image
                        source={{uri: imgURL}}
                        style={styling.image(index)}
                        placeholder={placeholderImage}
                    />
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

const styling = StyleSheet.create({
    container: (index) => ({
        flex: 1,
        marginTop:  index === 0 ? 0 : 10,
        // alignItems: 'center',
        // justifyContent: 'center',
    }),
    image: (index) => ({
        width: '100%',
        height: 400,
        // borderWidth: 2,
        // borderColor: 'rgba(210, 210, 210, 1)',
        borderRadius: 10,
    }),
    gradientBorder: {
        borderRadius: 12,
        padding: 4
    }
})

export default DisplayImageWithRedirect;


