import React, { Component } from 'react';
import { Link } from "react-router-dom";

import send from './assets/Icono_Envio.png'
import Bread from './Bread';


class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {

      products: [],
      categories: [],
      loading: true

    }
  }


  newSearch() {
    const urlParams = new URLSearchParams(window.location.search)
    const s = urlParams.get("search")
    fetch('http://localhost:3001/api/items?search=' + s)     
      .then((res) => {
        return res.json() 
      })
      .then((data) => {
        console.log(data);

        this.setState({
          products: data.items,
          categories: data.categories,
          loading: false
          
        })
      })

  }


  componentDidMount() {

    this.newSearch();
  }
  componentDidUpdate() {
    this.newSearch()
  }

  render() {
   
    if (this.state.loading) {
      return <p>Cargando...</p>
    }
    
    const productos = this.state.products.map(p =>
      <Link className="Link" to={"/items/" + p.id}>

        <div className="box">
          <img className="picture" src={p.picture} alt="" />

          <div className="middle">
            <span>{p.price.currency === "ARS" && "$"}</span>
            <span className="amount">{p.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </span>
            <span className="decimal">{p.price.decimal.padEnd(2, 0)}</span>
            <img className="send" src={p.free_shipping === true && send} />
            <div className="titlezize">
              <p className="title">{p.title}</p>
            </div>
            
          </div>
          <div className="location">{p.location}</div>
        </div>
      </Link>
    )


    return (
      <div className="div-container">
        <Bread categorias={this.state.categories}></Bread>

      <div>
        {productos}
      </div>

      </div>
    );
  }
}

export default ProductList;

