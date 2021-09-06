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

    const handlePage = (isNext) => fetchMore({variables: {
            page: page
        },
        updateQuery: (prev, {fetchMoreResult}) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
                characters: {...prev.characters, ...fetchMoreResult.characters}
            });
        }
    }).then(() => {
        const pageNumber = isNext ? page + 1 : page - 1;
        setPage(pageNumber);
    });

    const characters = data?.characters.results.map(character => {
        return  <CardDataGraphQL key={character.id} character={character} />
    });

    if (loading) return <h3>Loading...</h3>
    if (error) return  <h3>Error {error.message}</h3>

    return <Fragment>
        <div className={classes.dataList}>
            {characters}
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
