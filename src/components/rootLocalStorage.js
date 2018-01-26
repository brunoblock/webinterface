import React from "react";

import "components/root.css";

import LocalStorageWritter from "components/localstorage/localStorageWritter";
import LocalStorageReader from "components/localstorage/localStorageReader";

const RootLocalStorage = () => (
  <div className="App">
    <LocalStorageWritter />
    <LocalStorageReader />
  </div>
);

export default RootLocalStorage;
