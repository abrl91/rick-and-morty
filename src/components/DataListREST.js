import {Fragment, useCallback, useEffect, useState} from "react";
import useFetch from "../custom-hooks/useFetch";
import Card from "./Card";

const DataListREST = () => {
    const defaultEndpoint = 'https://rickandmortyapi.com/api';
    /*
        character
    */
    const characterApi = `${defaultEndpoint}/character`;
    const [loadingCharacter, errorCharacter, initialCharacterData] = useFetch(characterApi, {});
    const {info: characterInfo, results: defaultCharacterResults = [] } = initialCharacterData;
    const [characterResults, setCharacterResults] = useState(defaultCharacterResults);
    const [characterPage, setCharacterPage] = useState({
        ...characterInfo,
        current: characterApi,
    });
    const { current: currentCharacter } = characterPage;

    /*
        episode
    */
    const episodeApi = `${defaultEndpoint}/episode`;
    const [loadingEpisode, errorEpisode, initialEpisodeData] = useFetch(episodeApi, {});
    const { info: episodeInfo, results: defaultEpisodeResults = [] } = initialEpisodeData;
    const [episodeResults, setEpisodeResults] = useState(defaultEpisodeResults);
    const [episodePage, setEpisodePage] = useState({
        ...episodeInfo,
        current: episodeApi,
    });
    const {current: currentEpisode} = episodePage;

    const request = useCallback(async (type, setPage, setResults, currentEndPoint) => {
        const res = await fetch(currentEndPoint);
        const nextData = await res.json();
        const { info: nextInfo, results: nextResults = [] } = nextData;

        setPage(prev => {
            return {
                ...prev,
                ...nextInfo
            }
        });

        if ( !nextInfo?.prev ) {
            setResults(nextResults);
            return;
        }

        setResults(prev => {
            return [
                ...prev,
                ...nextResults
            ]
        });


    }, []);

    useEffect(() => {
        request('character', setCharacterPage, setCharacterResults, currentCharacter);
        request('episode', setEpisodePage, setEpisodeResults, currentEpisode);
    }, [request, currentCharacter, currentEpisode]);

    const handleLoadMore = () => {
        setCharacterPage(prev => (
            { ...prev, current: characterPage?.next }
        ));

        setEpisodePage(prev => (
            { ...prev, current: episodePage?.next }
        ));
    }

    const charactersData = characterResults.map((character) => (
        <Card key={character.id} character={character}/>
    ));



    if (loadingCharacter || loadingEpisode) return <p>Loading</p>
    if (errorCharacter || errorEpisode) return <p>Something Went Wrong</p>

    return <Fragment>
        <div className="data-list">
            {charactersData}
        </div>
        <button onClick={handleLoadMore}>load more</button>
    </Fragment>
}

export default DataListREST;
