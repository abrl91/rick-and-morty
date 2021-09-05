import {Fragment, useState} from "react";
import classes from './DataList.module.css';
import {useQuery} from "@apollo/react-hooks";
import CardDataGraphQL from "./CardDataGraphQL";
import {CHARACTER_QUERY} from '../graphql-queries/queries';


const DataListGQL = () => {
    const [page, setPage] = useState(1)
    const {loading, error,data, fetchMore} = useQuery(
        CHARACTER_QUERY, {
            variables: {
                page: page,
            },
            notifyOnNetworkStatusChange: true,
            fetchPolicy: "cache-and-network"
        },
    );

    if (loading) return <h3>Loading...</h3>
    if (error) return  <h3>Error {error.message}</h3>

    const charactersMapped = data?.characters.results.map(character => {
        return  <CardDataGraphQL key={character.id} character={character} />
    });

    const handlePage = (isNext) => fetchMore({variables: {
            page: page
        },
        updateQuery: (prev, {fetchMoreResults}) => {
            if (!fetchMoreResults) return prev;
            return Object.assign({}, prev, {
                characters: [...prev.characters, ...fetchMoreResults.characters]
            });
        }
    }).then(() => {
        const pageNumber = isNext ? page + 1 : page - 1;
        setPage(pageNumber);
    });


    return <Fragment>
        <div className={classes.dataList}>
            {charactersMapped}
        </div>
        <div className={classes.btnWrapper}>
            <button
                className={classes.loadMoreBtn}
                onClick={() => handlePage(false)}
                disabled={!data.characters.info.prev}
            >Previous</button>
            <button
                className={classes.loadMoreBtn}
                onClick={() => handlePage(true)}
                disabled={!data.characters.info.next}
            >Next</button>
        </div>
    </Fragment>
}

export default DataListGQL;
