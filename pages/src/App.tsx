import React from 'react';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import B from './pages/componentB'
import A from './pages/componentA'
import C from './pages/componentC'

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to='/a'>a</Link>
          <br />
          <Link to="/b">b</Link>
          <br />
          <Link to="/c">c</Link>
        </div>
        <div>
          <Route component={A} path="/a"></Route>
          <Route component={B} path="/b"></Route>
          <Route component={C} path="/c"></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
