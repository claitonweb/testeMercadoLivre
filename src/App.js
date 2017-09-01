import React, { Component } from 'react';
import Header from './components/Header'
import Main from './components/Main'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Header/>
        <div className="App container main">
          
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
