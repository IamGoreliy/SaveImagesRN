import {TouchableOpacity, Text} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const DeleteBtnEmoji = ({handlerDelete}) => {
    return (
        <TouchableOpacity onPress={handlerDelete}>
            <Text>
                <MaterialIcons name="delete-outline" size={24} color="white" />
            </Text>
        </TouchableOpacity>
    )
}

export default DeleteBtnEmoji;