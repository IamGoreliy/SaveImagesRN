import {FlatList, View, StyleSheet, Platform, Text} from "react-native";
import {Image} from "expo-image";
import {placeholderImage} from "../(tabs)";
import DisplayImageWithRedirect from "./DisplayImageWithRedirect";

const RenderImagePixabay = ({data, handlerListenerScroll}) => {

    return (
        // 🏀🏀🏀картинка может не прогружатся из за честого обращение к серверу🏀🏀🏀
        <View>
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




export default RenderImagePixabay;


//const {id, largeImageURL, webformatURL, tags: alt, user_id: photographerId, user: photographerName, userImageURL: photographerImage} = item;
