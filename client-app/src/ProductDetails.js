
import React, { Component } from 'react';
import Bread from './Bread';
import NumberFormat from 'react-number-format';



class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      product: {
        
        item: {
          price: {},

        }
      }

    }

  }

  componentDidMount() {

    fetch('http://localhost:3001/api/items/' + this.props.match.params.id) 
      .then((res) => {
        console.log(res)
        return res.json() 
      })
      .then((data) => {
        this.setState({
          product: data,
          categories: data.categories

        })

      })
  }




  render() {


    return (
      <div className="div-details">
        <Bread categorias={this.state.categories}></Bread>
        <div className="detailsw">
          <div className="left">
            <img className="one" src={this.state.product.item.picture} alt="" />
            <p className="P">Descripcion del Producto</p>
            <div className="description">{this.state.product.item.description}</div>
          </div>
          <div className="right">
            <div className="conditionSold">{this.state.product.item.condition === "new"? "Nuevo":"Usado"} - {this.state.product.item.sold_quantity} Vendidos</div>
            <div className="title1">{this.state.product.item.title}</div>

            <div className="price1">
              <span>{this.state.product.item.price.currency === "ARS" && "$"}</span>
              <span className="amount">{this.state.product.item.price.amount} </span>
              <span className="decimal">{this.state.product.item.price.decimals}</span>
            </div>

            <button className="compra">Comprar</button>

          </div>
        </div>
      </div>



    )

  }
}

export default ProductDetails;

{/* <p> {p.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {p.price.decimal.padEnd(2, 0)} </p>  */}