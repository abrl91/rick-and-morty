import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import {ApolloClient} from "apollo-boost";
import {ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/react-hooks";

const link = createHttpLink({
    uri: 'https://rickandmortyapi.com/graphql',
    //credentials: 'same-origin'
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
})

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
