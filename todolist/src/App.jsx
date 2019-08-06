import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from "./components/TopBar";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <TopBar />
      </Router>
    </div>
  );
};

export default App;
