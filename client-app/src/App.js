import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Filter from './Filter';
import './stylesheet/app.css';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';


 
class App extends Component {
 
  render() {

  
    return (
      <BrowserRouter>
      <div className="App">
      <Filter></Filter>
      <Route exact path="/items" component={ProductList} />
      {/* /// con el exact digo que solo lo muestre cuando este accediendo a esa direccion */}
      <Route path="/items/:id" component={ProductDetails} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

