import {FlatList, View, StyleSheet, Platform, Text} from "react-native";
import {Image} from "expo-image";
import {placeholderImage} from "../(tabs)";
import DisplayImageWithRedirect from "./DisplayImageWithRedirect";

const RenderImagePixabay = ({data, handlerListenerScroll}) => {

    return (
        // 🏀🏀🏀картинка может не прогружатся из за честого обращение к серверу🏀🏀🏀

        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            onEndReached={handlerListenerScroll}
            onEndReachedThreshold={0.5}
            renderItem={({item, index}) => {
                const {id, largeImageURL, webformatURL, tags: alt, user_id: photographerId, user: photographerName, userImageURL: photographerImage} = item;
                return (
                    <DisplayImageWithRedirect id={id} index={index} imgURL={largeImageURL}/>
                )
            }}
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




export default RenderImagePixabay;


//const {id, largeImageURL, webformatURL, tags: alt, user_id: photographerId, user: photographerName, userImageURL: photographerImage} = item;
