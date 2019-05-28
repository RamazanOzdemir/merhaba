import React, { Component } from 'react';
import M from "materialize-css";

class Carusel extends Component {
    componentDidMount = ()=>{
   
        const elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems, {});
    }
  render() {
    return (
      
        <div className="carousel">
            <a className="carousel-item" href="#/"><img src="https://lorempixel.com/250/250/nature/2"/></a>
            <a className="carousel-item" href="#/"><img src="https://lorempixel.com/250/250/nature/3"/></a>
            <a className="carousel-item" href="#/"><img src="https://lorempixel.com/250/250/nature/4"/></a>
            <a className="carousel-item" href="#/"><img src="https://lorempixel.com/250/250/nature/1"/></a>
            <a className="carousel-item" href="#/"><img src="https://lorempixel.com/250/250/nature/5"/></a>
        </div>
      
    )
  }
}

export default Carusel
