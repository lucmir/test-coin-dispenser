import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinRequestForm from './components/CoinRequestForm'; 

class App extends Component {

  renderHeader = () => {
    return ( 
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Request Test Bitcoins</h1>
      </header>
    );
  };

  render() {
    return ( 
        <div className="App">
          { this.renderHeader() }
          <div className="App-intro">
            <CoinRequestForm /> 
          </div>
        </div>
    );
  }
}

export default App;
