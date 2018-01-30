import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import "index.css";

import { store, persistor } from "./redux";
import Root from "./components/root";
import DownloadUploadHistoryButton from "./components/upload-history";
import registerServiceWorker from "./register-service-worker";
// persistor.purge();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <Route exact path='/' component={Root} />
          <Route path="/downloadUploadHistory" component={DownloadUploadHistoryButton} />
        </div>
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
