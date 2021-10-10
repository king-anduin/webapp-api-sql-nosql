// client/src/App.js

import React from 'react';
import logo from './logo.svg';
import './App.css';
import getUser from './api.js';
getUser();
function App() {
  const [data, setData] = React.useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? 'Loading...' : data}</p>
      </header>
    </div>
  );
}

export default App;
