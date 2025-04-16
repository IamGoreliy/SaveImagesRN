import {TouchableOpacity, StyleSheet} from "react-native";
import {placeholderImage} from "../(tabs)";
import {Image} from "expo-image";
import {Link, useRouter} from "expo-router";

const DisplayImageWithRedirect = ({imgURL, id, index}) => {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push({
            pathname: '/imagePage/[idImage]',
            params: {id, secondId: index, imgURL},
        })}>
        <Image
            source={{uri: imgURL}}
            style={styling.image(index)}
            placeholder={placeholderImage}
        />
        </TouchableOpacity>
    )
}

const styling = StyleSheet.create({
    image: (index) => ({
        width: '100%',
        height: 400,
        marginTop:  index === 0 ? 0 : 10,
        borderWidth: 2,
        borderColor: 'rgba(210, 210, 210, 1)',
    })
})

export default DisplayImageWithRedirect;


