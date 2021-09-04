import {useQuery} from "react-query";
import {Fragment, useState} from "react";
import CardDataREST from "./CardDataREST";
import classes from "./DataList.module.css";

const DataListUseQuery = () => {
    const [page, setPage] = useState(1);

    const fetchCharacters = (page = 1) => fetch(
        'https://rickandmortyapi.com/api/character?page=' + page)
            .then((res) => res.json());

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
    } = useQuery(['characters', page],
        () => fetchCharacters(page),
        { keepPreviousData : true });

    if (isLoading) return <h3>Loading...</h3>
    if (isError) return <h3>Error {error.message}</h3>


    return <Fragment>
            {data && <div className={classes.dataList}>
                        {data.results.map(character => (
                           <CardDataREST key={character.id} character={character} />
                        ))}
                    </div>
            }
            <div className={classes.btnWrapper}>
                <button
                    className={classes.loadMoreBtn}
                    onClick={() => setPage(old => Math.max(old - 1, 0))}
                    disabled={!data.info.prev}
                >
                    Previous
                </button>{' '}
                <button
                    className={classes.loadMoreBtn}
                    onClick={() => {
                        if (!isPreviousData && data.info.next) {
                            setPage(old => old + 1)
                        }
                    }}
                    disabled={isPreviousData || !data?.info.next}
                >
                    Next
                </button>
            </div>
            {isFetching ? <span> Loading...</span> : null}{' '}
        </Fragment>
}

export default DataListUseQuery;
