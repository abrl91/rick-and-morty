import {useEffect, useState} from "react";
import {constructedData} from "../api/rest/constructedData";

export function useConstructData({isDataLoaded, data: {data} }) {
    const [loadedData, setLoadedData] = useState(null);
    useEffect(() => {
        if (isDataLoaded) {
            setLoadedData({
               rickAndMorty: constructedData(data)
            });
        }
    }, [isDataLoaded]);
    return {loadedData}
}
