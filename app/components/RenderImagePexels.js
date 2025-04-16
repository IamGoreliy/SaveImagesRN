import {FlatList, View, StyleSheet, Platform, Text, Dimensions} from "react-native";
import {Image} from "expo-image";
import {placeholderImage} from "../(tabs)";
import DisplayImageWithRedirect from "./DisplayImageWithRedirect";

const {height: heightScreen} = Dimensions.get('window');




const RenderImagePexels = ({data, handlerListenerScroll}) => {
    return (
            <View>
                <FlatList
                    data={data}
                    onEndReached={handlerListenerScroll}
                    onEndReachedThreshold={0.5}
                    renderItem={({item, index}) => {
                        const {alt, id, photographer, photographer_id: photographerId, photographer_url: photographerUrl, src: {original}} = item;
                        return (
                            <DisplayImageWithRedirect id={id} index={index} imgURL={original}/>
                        )
                    }}
                    //🥎🥎🥎 В keyExtractor используеться индекс каждого элемента в масиве а не ID item, так как id item не являеться уникальным (повторяються картинки и соответственно повторяються id)🎾🎾🎾
                    keyExtractor={(_, index) => index.toString()}
                    style={styling.list()}
                />
            </View>
    )
}

const styling = StyleSheet.create({
    list: () =>  ({
        height: Platform.OS === 'web' ? 870 : 610,
        flexDirection: 'column',
    }),
    image: (index) => ({
        width: '100%',
        height: 400,
        marginTop:  index === 0 ? 0 : 10,
        borderWidth: 2,
        borderColor: 'rgba(210, 210, 210, 1)',
    })
})

export default RenderImagePexels


// const {alt, id, photographer, photographer_id: photographerId, photographer_url: photographerUrl, src: {original}} = item;
