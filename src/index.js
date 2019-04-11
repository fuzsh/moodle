import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/Aplication";
import store from "./Store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
