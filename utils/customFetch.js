import {fetch} from "expo/fetch";

export const fetchPixabay = async (userSearchParams = '', currentPage = 1, counter = 30) => {
    let response;
    const queryUrl = userSearchParams
        ? `https://pixabay.com/api/?key=36557870-a3c4f5f8335885c8888277755&q=${userSearchParams}&page=${currentPage}&per_page=${counter}`
        : `https://pixabay.com/api/?key=36557870-a3c4f5f8335885c8888277755&page=${currentPage}&per_page=${counter}`;
    try {
        response = await fetch(queryUrl);
        if (!response.ok) {
           throw new Error(`ошибка ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (e) {
        console.log(e.message);
        throw e
    }
}
