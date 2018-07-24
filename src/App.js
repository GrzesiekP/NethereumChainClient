import React, { Component } from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import LocationTable from './Components/LocationTable'
import Header from './Components/Header'
import InsertionForm from './Components/InsertionForm';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header/>
        <LocationTable/>
        <InsertionForm/>
      </div>
    );
  }
}

export default App;
