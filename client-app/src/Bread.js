
import React, { Component } from 'react';



class Bread extends Component {
  
  
  render() {
    
    return (
      <div className="div-bread">

       <div><p className="breadCrumb">{this.props.categorias.map((c,i)=> 
       <span className="category">{c}{this.props.categorias.length-1!=i && <span> > </span> }</span>)} </p></div>
      </div>
      
    );
  } 
}

export default Bread;