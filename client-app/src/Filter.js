import React, { Component } from 'react'
import ada from './assets/Ada_Iso_Blanco.png'
import search from './assets/Icono_Search.png'
import{Link}from "react-router-dom"


class Filter extends Component {
  constructor(props){
    super(props)
    this.state={
      
      valueDelInput:""
    }

    this.handleOnchangeInput=this.handleOnchangeInput.bind(this)
  }
  
  handleOnchangeInput (e) {
    this.setState({
      valueDelInput: e.target.value
    })
  }



  render() {
  

    return (
      <div className="app">

        <nav className="nav"><img className="loguito" src={ada} alt="" />
        
        <input value= {this.state.valueDelInput} onChange={this.handleOnchangeInput}className="input"  type="text" placeholder="Nunca dejes de buscar"  />
        <Link to={"/items?search=" + this.state.valueDelInput}> <button className="search" > <img  src={search} alt="" /> </button></Link>
      
        </nav>

      </div>
    );
  }
}

export default Filter;

