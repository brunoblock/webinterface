import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import "index.css";

import redux from "./redux";
import Root from "./components/root";
import RootLocalStorage from "./components/rootLocalStorage";
import registerServiceWorker from "./register-service-worker";

const App = () => (
  <Provider store={redux}>	
     <Router>
      <div>
      	<Route exact path='/' component={Root} />
      	<Route path="/localStorage" component={RootLocalStorage} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
