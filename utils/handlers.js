import {CameraType} from "expo-image-picker";



export const handlerOpenGallery = async (status, requestPermission, picker, setImgUser) => {
    try {
        if (!status.granted) {
            const permissionResult = await requestPermission();
            if (!permissionResult.granted) {
                alert('нет доступа');
                return;
            }
        }

        const result = await picker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });
        if (result.canceled) {
            alert('вы не выбрали фото');
            return;
        }
        setImgUser(result.assets[0].uri);
    } catch (e) {
        console.error(e.message);
    }
};

export const handlerOpenCamera = async (statusCamera, requestPermissionCamera, ImagePicker, setImgUser) => {
    try {
        if (!statusCamera.granted) {
            const permissionResult = await requestPermissionCamera();
            console.log('сделали фото')
            if (!permissionResult.granted) {
                alert('нет доступа');
                return;
            }
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [3, 4],
                quality: 1,
                cameraType: CameraType.back,
            });
            if (result.canceled) {
                alert('вы не сделали фото');
                return;
            }
            setImgUser(result.assets[0].uri);
        }
    }catch (e) {
        console.error(e.message);
    }
};

export const saveImageFromMyGallery = async (pictureRef, status, requestPermission, captureRef, MediaLibrary) => {
    try {
        if (!pictureRef.current) {
            alert('Нет компонента')
            return;
        }

        if(!status?.granted) {
            const permissionResponse = await requestPermission();
            if (!permissionResponse.granted) {
                alert('нет доступа');
                return;
            }
        }


        const saveImage = await captureRef(pictureRef.current, {
            quality: 1,
            format: "jpg",
        })
        await MediaLibrary?.saveToLibraryAsync(saveImage);
        if (saveImage) {
            alert('изображение сохранено');
        }
    } catch (e) {
        console.log('Ошибка скрина', e.message);
    }
};

export const sharedImage = async (sharing, captureRef, pictureRef) => {
    try {
        if (!(await sharing.isAvailableAsync())) {
            alert('нет доступа для Share');
            return;
        }

        const imageForShare = await captureRef(pictureRef.current, {
            quality: 1,
            format: "jpg",
        });

        if (!imageForShare) {
            alert('нет картинки для отправки');
            return;
        }

        await sharing.shareAsync(imageForShare, {
            dialogTitle: 'привет смотри что я нашел'
        })
    } catch (e) {
        console.error(e.message);
    }
    alert('успешно отправлено')
}

