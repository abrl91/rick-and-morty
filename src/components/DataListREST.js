import {Fragment, useEffect, useState} from "react";
import CardDataREST from "./CardDataREST";
import classes from "./DataList.module.css";

const DataListREST = () => {
    const baseApiEndPoint = 'https://rickandmortyapi.com/api';
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState({});
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setLoading(true);
        fetch(`${baseApiEndPoint}/character/?page=${page}`)
            .then(res => {
                if (res.status !== 200) throw new Error('Error! Something went wrong :(');
                return res.json();
            })
            .then(({info: resDataInfo, results: resDataResults}) => {
                setInfo(resDataInfo);
                setResults(resDataResults);
                setError(null);
            })
            .catch(error => {
                setError(error);
                setResults([]);
            })
            .finally(() => setLoading(false));
    }, [baseApiEndPoint, page]);

    const characters = results.map(character => (
        <CardDataREST key={character.id} character={character} />
    ));

    const handleNext = () =>  setPage(page + 1);

    const handlePrevious = () => setPage(page - 1);

    if (loading) return <h3>Loading..."</h3>
    if (error) return <h3>{error.message}</h3>

    return <Fragment>
        <div className={classes.dataList}>
            {characters}
        </div>
        <div className={classes.btnWrapper}>
            <button
                className={classes.loadMoreBtn}
                disabled={!info.prev}
                onClick={handlePrevious}
            >Previous
            </button>
            <button
                className={classes.loadMoreBtn}
                disabled={!info.next}
                onClick={handleNext}
            >Next
            </button>
        </div>
    </Fragment>
}

export default DataListREST;
