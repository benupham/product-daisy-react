import React from 'react';
import '../css/Product.css';

export default class Product extends React.Component {

  handleClick = e => {
    // Summon the product detail modal
  }

  handleAddToCart = product => {
    console.log('add', product)
  }

  render() {
    const x = this.props.x;
    const y = this.props.y; 
    const sponsored = this.props.sponsored ? 'sponsored' : '';

    return (
      <g className={`Product`} onClick={() => this.handleClick()} transform={`translate(${x}, ${y})`}
      >
        <rect className={`wrap ${this.props.type} ${sponsored}`}>
          <text>{this.props.name} {this.props.sponsored ? 'spon' : ''}</text>
        </rect>  
      </g>
    )  
  }
}

function AddToCartButton(props) {
  return (
    <button onClick={props.onClick}>Add to Cart</button>
  )
}
