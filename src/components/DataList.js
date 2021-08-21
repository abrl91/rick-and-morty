import {Fragment} from "react";
import Card from "./Card";
import {useFetchRichNMorty} from "../custom-hooks/useFetchRichNMorty";
import {useConstructData} from "../custom-hooks/useConstructData";

const DataList = () => {
    const ricknMortyData = useFetchRichNMorty(['character', 'location', 'episode']);
    const {loadedData} = useConstructData(ricknMortyData);

    if (!loadedData) return <p>Loading...</p>

    return <Fragment>
        <ul>
            <Card data={loadedData.rickAndMorty}/>
        </ul>
    </Fragment>
}

export default DataList;
