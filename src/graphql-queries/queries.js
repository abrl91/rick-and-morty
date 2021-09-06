import {gql} from "apollo-boost";

export const CHARACTER_QUERY = gql`
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

export const CHARACTERS = gql`
{
  characters {
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
