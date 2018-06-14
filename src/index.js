import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// uikit
import "../node_modules/uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);
window.UIkit = UIkit;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
