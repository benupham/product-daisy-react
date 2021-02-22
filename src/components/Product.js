import React from 'react';

export default class Product extends React.Component {

  handleClick = e => {
    // Summon the product detail modal
  }

  handleAddToCart = product => {
    console.log('add', product)
  }

  render() {
    return (
      <li className="Product">
        <div>
          <img className="Product-image" src={this.props.img} alt={this.props.name} />
        </div>
        <h3 className="Product-name">{this.props.name}</h3>
        <AddToCartButton onClick={() => this.props.addToCart(this.props.itemIndex)} />
      </li>
    )  
  }
}

function AddToCartButton(props) {
  return (
    <button onClick={props.onClick}>Add to Cart</button>
  )
}
