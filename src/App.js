import Dashboard from "./Dashboard";
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
