import './App.css';
import {Fragment} from "react";
import DataListREST from "./components/DataListREST";
import Header from "./components/Header";
import {Route} from "react-router-dom";
import DataListGQL from "./components/DataListGQL";
import DataListUseQuery from "./components/DataListUseQuery";
import {QueryClient, QueryClientProvider} from "react-query";
import Temp from "./components/Temp";

function App() {
    const queryClint = new QueryClient();

  return <Fragment>
      <Header />
      <Route path='/rest'>
          <DataListREST />
      </Route>
     <Route path="/reactUseQuery">
         <QueryClientProvider client={queryClint}>
             <DataListUseQuery />
         </QueryClientProvider>
     </Route>
      <Route path='/graphql'>
          <DataListGQL />
          {/*<Temp />*/}
      </Route>

  </Fragment>
}

export default App;
