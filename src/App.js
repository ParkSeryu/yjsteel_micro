import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import Login from "./Route/Login";
import Home from "./Route/Home";
function App() {
  return (
    <HashRouter>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
    </HashRouter>
  );
}

export default App;
