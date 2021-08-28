import './App.css';
import {Fragment} from "react";
import DataListREST from "./components/DataListREST";

function App() {

  return <Fragment>
      <h2>REST API approach</h2>
      <div className="rest">
         <DataListREST />
      </div>
      {/*<h2>GraphQL approach</h2>
      <div className="graphql">
      </div>*/}

  </Fragment>
}

export default App;
