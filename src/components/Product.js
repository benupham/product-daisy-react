import React from 'react';
import '../css/Product.css';
import { wrapName } from '../utilities';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
  }

  componentDidMount() {
    wrapName(this.nameRef.current, this.props.name, this.props.type);
  }

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
      <g ref={this.nameRef} className={`Product`} onClick={() => this.handleClick()} transform={`translate(${x}, ${y})`}
      >
        <rect className={`wrap ${this.props.type} ${sponsored}`} />
        <rect className={`name`} height="150px" width="150px" />            
        <text >{this.props.name}</text>
      </g>
    )  
  }
}

function AddToCartButton(props) {
  return (
    <button onClick={props.onClick}>Add to Cart</button>
  )
}
