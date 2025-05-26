import {FlatList, View, StyleSheet, Platform, Text, Dimensions} from "react-native";
import {Image} from "expo-image";
import {placeholderImage} from "../(tabs)";
import DisplayImageWithRedirect from "./DisplayImageWithRedirect";

const {height: heightScreen} = Dimensions.get('window');




const RenderImagePexels = ({data, handlerListenerScroll}) => {
    return (

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

    )
}

const styling = StyleSheet.create({
    list: () =>  ({
        height: Platform.OS === 'web' ? 870 : '100%',
        flexDirection: 'column',
    })
})

export default RenderImagePexels


// const {alt, id, photographer, photographer_id: photographerId, photographer_url: photographerUrl, src: {original}} = item;
