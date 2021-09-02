import {Fragment, useCallback, useEffect, useState} from "react";
import Card from "./Card";

const DataListREST = () => {
    const defaultEndpoint = 'https://rickandmortyapi.com/api';
    const characterEndPoint = `${defaultEndpoint}/character`;
    const [characterResults, setCharacterResults] = useState([]);
    const [characterPage, setCharacterPage] = useState({
        prev: null,
        current: characterEndPoint,
        next: null,
        pages: 34,
        count: 671,
    });
    const { current: currentCharacter } = characterPage;

    const request = useCallback(async () => {
        const res = await fetch(currentCharacter);
        const nextData = await res.json();
        const { info: nextInfo, results: nextResults = [] } = nextData;

        setCharacterPage(prev => {
            return {
                ...prev,
                ...nextInfo
            }
        });

        setCharacterResults(prev => {
            return [
                ...prev,
                ...nextResults
            ]
        });


    }, [currentCharacter]);

    useEffect(() => {
        request();
    }, [request]);



    const handleLoadMore = () => {
        setCharacterPage(prev => (
            { ...prev, current: characterPage?.next }
        ));
    }

    const charactersData = characterResults.map((character) => {
        return <Card key={Math.random()} character={character}/>
    });

    return <Fragment>
        <div className="data-list">
            {charactersData}
        </div>
        <button onClick={handleLoadMore}>load more</button>
    </Fragment>
}

export default DataListREST;
