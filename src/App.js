import './App.css';
import {Fragment} from "react";
import DataList from "./components/DataList";

function App() {


  return <Fragment>
      <h2>REST API approach</h2>
      <div className="rest">
         <DataList />
      </div>
      {/*<h2>GraphQL approach</h2>
      <div className="graphql">
      </div>*/}

  </Fragment>
}

export default App;
