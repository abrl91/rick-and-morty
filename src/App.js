import './App.css';
import {Fragment} from "react";
import DataListREST from "./components/DataListREST";
import Header from "./components/Header";
import {Route} from "react-router-dom";
import DataListGQL from "./components/DataListGQL";
import {ApolloClient} from "apollo-boost";
import {ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/react-hooks";

function App() {

    const link = createHttpLink({
        uri: 'https://rickandmortyapi.com/graphql',
        credentials: 'same-origin'
    })

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link
    })

  return <Fragment>
      <ApolloProvider client={client}>
          <Header />
          <Route path='/rest'>
              <DataListREST />
          </Route>
          <Route path='/graphql'>
              <DataListGQL />
          </Route>
      </ApolloProvider>


  </Fragment>
}

export default App;
