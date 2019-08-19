import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";

import MainPage from "./pages/mainPage/index.jsx";
import Ls from "./pages/ls/index.jsx";
import "./css/App.css";

class App extends React.Component {
  getChildContext() {
    return {
      ipc: this.props.ipc
    };
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/mainPage" component={MainPage} />
          <Route path="/ls" component={Ls} />
        </Router>
      </div>
    );
  }
}
App.childContextTypes = {
  ipc: PropTypes.object
};
export default App;
