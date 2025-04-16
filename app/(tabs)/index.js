import {Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal} from "react-native";
import {useCallback, useEffect, useMemo, useState} from "react";
import debounce from "debounce";
import {fetchPixabay} from "../../utils/customFetch";
import {createClient} from "pexels";
import RenderImagePexels from "../components/RenderImagePexels";
import RenderImagePixabay from "../components/RenderImagePixabay";
import SearchButton from "../components/HomePage/SearchButton";
import ButtonOpenSearchMenu from "../components/HomePage/ButtonOpenSearchMenu";

import TitleInHomePage from "../components/HomePage/TitleInHomePage";

const clientPexels = createClient('Nb9CCp1nEA2HWMDEF9Vfo3duvR76rV84iwOFUW2YdK0rBk2VdrUge7pH');

export const placeholderImage = require('../../assets/placeholderForDownloadingImage/placeholderForDownloadImage.png');

const Home = () => {
    const [inputSearch, setInputSearch] = useState('');
    const [whatResourceSelected, setWhatResourceSelected] = useState('pexels');
    const [imageData, setImageData] = useState([]);
    const [searchWindowIsOpen, setSearchWindowIsOpen] = useState(false);
    const [nextPage, setNextPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handlerSearch = useMemo(() => {
        return debounce((value) => {
            setInputSearch(value);
        }, 500);
    }, []);


    const handlerPexelsDownloadImage = useCallback((objOption = {page: 1, per_page: 1}) => clientPexels.photos.curated(objOption) ,[]);
    const handlerPixabayDownloadImage = useCallback((inputSearch = '', currentPage, counter = 30) =>  fetchPixabay(inputSearch, currentPage, counter),[]);
    const handlerPexelsSearchPhotoByName = useCallback((query = 'flower', perPage = 1) => clientPexels.photos.search({query, per_page: perPage}), []);
    const handlerToggleButton = useCallback((value) => {
        if (whatResourceSelected === value) {
            return;
        }
        if (imageData.length > 0) setImageData([]);

        setWhatResourceSelected(value);
        setCurrentPage(1);
    });
    const handlerTogglerModal = useCallback(() => setSearchWindowIsOpen(PrevState => !PrevState), []);
    const handlerSignalWhenScrollBelow = useCallback(() => setNextPage(true),[]);



    useEffect(() => {
        if (whatResourceSelected === 'pexels') {
            handlerPexelsDownloadImage({page: currentPage, per_page: 10})
                .then(res => {
                    const {next_page: nextPage, page, per_page: PerPage, photos, total_results: totalResults} = res;
                    setImageData(prevState => [...prevState, ...photos]);
                })
                .catch(error => console.error(error));
        } else {
            handlerPixabayDownloadImage('', currentPage, 10)
                .then(res => {
                    const {hits, total, totalHits} = res;
                    setImageData(prevState => [...prevState, ...hits]);
                })
                .catch(error => console.error(error));
        }

    }, [whatResourceSelected, currentPage]);

    useEffect(() => {
        if (!inputSearch) {
            return;
        }
        if (whatResourceSelected === 'pexels') {
            handlerPexelsSearchPhotoByName(inputSearch, 30)
                .then(response => {
                    const {next_page: nextPage, page, per_page: PerPage, photos, total_results: totalResults} = response;
                    setImageData(photos);
                })
                .catch(error => console.error(error));
        } else {
            handlerPixabayDownloadImage(inputSearch, 30)
                .then(response => {
                    const {hits, total, totalHits} = response;
                    setImageData(hits);
                })
                .catch(error => console.error(error));
        }
    }, [inputSearch, whatResourceSelected]);


    useEffect(() => {
        if (nextPage) {
            setNextPage(false);
            setCurrentPage(prevState => prevState + 1);
        }
    }, [nextPage]);


    return (
        <View
            style={stylingHomePage.main}
        >
            { !searchWindowIsOpen && <ButtonOpenSearchMenu statusButton={searchWindowIsOpen} toggler={handlerTogglerModal}/>}
            <TitleInHomePage namePage={whatResourceSelected}/>
            <SearchButton
                toggler={handlerToggleButton}
                resourseSelected={whatResourceSelected}
                searcher={handlerSearch}
                modalStatus={searchWindowIsOpen}
                closeModal={handlerTogglerModal}
            />
            <View style={{height: '100%',  marginTop: 20}}>
                {imageData.length > 0 &&  whatResourceSelected === 'pexels'
                    ? <RenderImagePexels
                        data={imageData}
                        handlerListenerScroll={handlerSignalWhenScrollBelow}
                    />
                    : <RenderImagePixabay
                        data={imageData}
                        handlerListenerScroll={handlerSignalWhenScrollBelow}
                    />
                }
            </View>
        </View>
    )
}

const stylingHomePage = StyleSheet.create({
    main: {
        padding: 10,
        marginTop: 40,
    },



})

export default Home;