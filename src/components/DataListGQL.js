import {Fragment, useState} from "react";
import classes from './DataList.module.css';
import { gql } from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import CardDataGraphQL from "./CardDataGraphQL";


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


    if(loading) return <h3>Loading...</h3>
    if (error) return  <h3>Error {error.message}</h3>

    console.log(data, 'data')
    const charactersMapped = data?.characters.results.map(character => {
        return  <CardDataGraphQL key={character.id} character={character} />
    })

    return <Fragment>
        <div className={classes.dataList}>
            {charactersMapped}
        </div>
        <div className={classes.btnWrapper}>
            <button className={classes.loadMoreBtn} onClick={() => fetchMore({variables: {
                    page: data.characters.info.next
                },
                updateQuery: (prev, {fetchMoreResults}) => {
                    if (!fetchMoreResults) return prev;
                    return Object.assign({}, prev, {
                        characters: [...prev.characters, ...fetchMoreResults.characters]
                    });
                }
            }).then(characterInfoAndData => {
                setPage(characterInfoAndData.data.characters.info.prev - 1);
            })
            }>Previous</button>
            <button className={classes.loadMoreBtn} onClick={() => fetchMore({variables: {
                        page: data.characters.info.next
                    },
                    updateQuery: (prev, {fetchMoreResults}) => {
                        if (!fetchMoreResults) return prev;
                        return Object.assign({}, prev, {
                            characters: [...prev.characters, ...fetchMoreResults.characters]
                        });
                    }
                }).then(characterInfoAndData => {
                    setPage(characterInfoAndData.data.characters.info.next - 1);
                })
            }
            >Next</button>

        </div>
    </Fragment>
}

const CHARACTER_QUERY = gql`
    query getCharacters($page: Int!) {
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
