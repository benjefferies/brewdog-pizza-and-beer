import React from 'react';
import NavBar from './components/NavBar.js';
import './App.css';
import Product from './components/Products.js';
import CartNavBar from './components/CartNavBar.js';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      beerSelection: "Pizza"
    }
  }

  setBeerSelection(beerSelection) {
    this.setState({beerSelection: beerSelection})
  }

  render() {
    return (
      <div>
        <CartNavBar/>
        <Product beerSelection={this.state.beerSelection} setBeerSelection={(beerSelection) => this.setBeerSelection(beerSelection)} />
        <NavBar beerSelection={this.state.beerSelection} setBeerSelection={(beerSelection) => this.setBeerSelection(beerSelection)} />
      </div>
    );
  }
}

export default App;
