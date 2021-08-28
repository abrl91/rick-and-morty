import {Fragment, useCallback, useEffect, useState} from "react";
import useFetch from "../custom-hooks/useFetch";
import Card from "./Card";

const DataList = () => {
    const defaultEndpoint = 'https://rickandmortyapi.com/api/character';
    const [loading, error, initialData] = useFetch(defaultEndpoint, {});
    const {info, results: defaultResults = [] } = initialData;
    const [results, setResults] = useState(defaultResults);
    const [page, setPage] = useState({
        ...info,
        current: defaultEndpoint,
    });
    const { current } = page;

    const request = useCallback(async () => {
        //if (current === baseEndpoint) return;
        const res = await fetch(current);
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

    }, [current]);

    useEffect(() => {
        request();
    }, [request]);

    const handleLoadMore = () => {
        setPage(prev => (
            {
                ...prev,
                current: page?.next,
            })
        );
    }

    const charactersData = results.map((character) => (
        <Card key={character.id} character={character}/>
    ));

    if (loading) return <p>Loading</p>
    if (error) return <p>Something Went Wrong</p>

    return <Fragment>
        <div className="data-list">
            {charactersData}
        </div>
        <button onClick={handleLoadMore}>load more</button>
    </Fragment>
}

export default DataList;
