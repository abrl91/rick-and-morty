import './App.css';
import DataList from "./components/DataList";
import {Fragment} from "react";

function App() {
  return <Fragment>
      <h2>REST API approach</h2>
      <div className="rest">
          <DataList />
      </div>
      <h2>GraphQL approach</h2>
      <div className="graphql">
          <DataList />
      </div>

  </Fragment>
}

export default App;
