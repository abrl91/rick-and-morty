import {useEffect, useState} from "react";
import {getRickAndMortyData} from "../api/rest/getData";

export function useFetchRichNMorty(types) {
    const [data, setData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rickAndMortyRequests = types.map(getRickAndMortyData);
                const results = await Promise.all(rickAndMortyRequests);
                const [character, location, episode] = results;
                const rickAndMortyData = { character, location, episode }

                setData(rickAndMortyData);
                setIsDataLoaded(true);

            } catch (error) {
                console.log(error, 'error from useFetchRichNMorty')
            }
        }
        fetchData();
    }, []);

    return {isDataLoaded, data}
}
