import {useEffect, useState} from "react";
import {getRickAndMortyData} from "../api/rest/getData";

export function useFetchRichNMorty(types) {
    const [ricknMortyData, setRickAndMortyData] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rickAndMortyRequests = types.map(getRickAndMortyData);
                const results = await Promise.all(rickAndMortyRequests);
                const [characters, locations, episodes] = results;
                const rickAndMortyData = { characters, locations, episodes }

                setRickAndMortyData(rickAndMortyData);
                setIsDataLoaded(true);

            } catch (error) {
                console.log(error, 'error from useFetchRichNMorty')
            }
        }
        fetchData();
    }, []);
    return {isDataLoaded, ricknMortyData}
}
