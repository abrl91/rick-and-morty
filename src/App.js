import './App.css';
import {Fragment} from "react";
import DataListREST from "./components/DataListREST";
import Header from "./components/Header";
import {Route} from "react-router-dom";
import DataListGQL from "./components/DataListGQL";

function App() {

  return <Fragment>
      <Header />
      <Route path='/rest'>
          <DataListREST />
      </Route>
      <Route path='/graphql'>
          <DataListGQL />
      </Route>

  </Fragment>
}

export default App;
