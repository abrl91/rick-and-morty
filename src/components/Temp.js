import {Fragment} from "react";
import {useQuery} from "@apollo/react-hooks";
import {CHARACTERS} from "../graphql-queries/queries";
import Characters from "./Characters";

const Temp = () => {
    const {data, loading, fetchMore} = useQuery(CHARACTERS);
    const cursor = parseInt(data?.characters.results[data?.characters.results.length - 1]) || 20;
    console.log(cursor)
    return <Fragment>
        <Characters entries={data?.characters.results || []} onLoadMore={() => fetchMore({
            query: CHARACTERS,
            variables: {cursor},
            updateQuery: (previousResult, { fetchMoreResult }) => {
                console.log(previousResult, 'previousResults');
                console.log(fetchMoreResult, 'fetchMoreResults');
                const prevEntry = previousResult.characters;
                const moreData = fetchMoreResult.characters;
                const newCursor = fetchMoreResult.characters.cursor;


                const newEntry = {
                    characters: {
                        cursor: newCursor,
                        info: {...prevEntry.info, ...moreData.info},
                        results: [...moreData.results, ...prevEntry.results],
                        __typename: prevEntry.__typename
                    }

                };
                console.log(newEntry, 'newEntry')
                return newEntry;
            }
         })
        }
        />
    </Fragment>

}

export default Temp;
