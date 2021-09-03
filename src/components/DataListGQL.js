import {Fragment} from "react";
import classes from './DataList.module.css';
import Card from "./Card";
import { gql } from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";


const DataListGQL = () => {
    const {loading, error,data, fetchMore} = useQuery(
        CHARACTER_QUERY, {
            variables: {
                page: 1,
            }
        }

    );

/*    const {characters} = data;
    const {results, info} = characters;*/

    const handleLoadMore = () => {

       return fetchMore({variables: {
            page: data.characters.info.next
            },
            updateQuery: (prev, {fetchMoreResults}) => {
                if (!fetchMoreResults) return prev;
                return Object.assign({}, prev, {
                    characters: [...prev.characters, ...fetchMoreResults.characters]
                })
            }
        })
    }

    if(loading) return <p>Loading...</p>
    if (error) return  <p>Error {error.message}</p>

   /* console.log(data, 'data')
    const charactersMapped = data.characters.results.map(character => {
        return  <Card key={character.id} character={character} />
    })*/

    return <Fragment>
        <div className={classes.dataList}>
            {/*{charactersMapped}*/}
        </div>
        <div className={classes.btnWrapper}>
            <button className={classes.loadMoreBtn} onClick={handleLoadMore}>Load More</button>
        </div>
    </Fragment>
}

const CHARACTER_QUERY = gql`
    query getCharacters($page: Int) {
      characters(page: $page) {
        info {
          next
          prev
          count
          pages
        }
        results {
          id
          name
          image
          status
          species
          location {
            name
          }
          episode {
            id
            name
          }
        }
      }
    }
   `

export default DataListGQL;
