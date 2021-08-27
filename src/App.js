import './App.css';
import {Fragment, useCallback, useEffect, useState} from "react";
import Card from "./components/Card";

function App() {
    const defaultEndpoint = 'https://rickandmortyapi.com/api/character';
    const [character, setCharacter] = useState({});
    const {info, results: defaultResults = [] } = character;
    const [results, setResults] = useState(defaultResults);
    const [page, setPage] = useState({
       ...info,
       current: defaultEndpoint,
    });
    const { current } = page;

    const getData = useCallback(async () => {
        const res = await fetch(defaultEndpoint);
        const responseData = await res.json();
        setCharacter(responseData);
    }, []);

    const request = useCallback(async () => {
        //if (current === defaultEndpoint) return;
        const res = await fetch(current)
        const nextData = await res.json();
        const { info: nextInfo, results: nextResults } = nextData;

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

    useEffect (() =>  {
       getData();
    }, [getData]);

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

    const charactersData = results.map((characters) => (
           <Card characters={characters}/>
    ));

  return <Fragment>
      <h2>REST API approach</h2>
      <div className="rest">
          {charactersData}
      </div>
      {/*<h2>GraphQL approach</h2>
      <div className="graphql">
      </div>*/}
      <button onClick={handleLoadMore}>load more</button>

  </Fragment>
}

export default App;
