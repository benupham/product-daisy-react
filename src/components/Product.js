import React from 'react';
import '../css/Product.css';
import { wrapName } from '../utilities';
import { nameFontSize, nameWidth } from '../constants'; 

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
  }

  componentDidMount() {
    // Injects the product name inside the wrap rect
    wrapName(this.nameRef.current, this.props);
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
        <rect className={`wrap ${this.props.type} ${sponsored}`} ></rect>
        <image className="image" href={`../images/${this.props.img}`} />
      </g>
    )  
  }
}

function AddToCartButton(props) {
  return (
    <button onClick={props.onClick}>Add to Cart</button>
  )
}
