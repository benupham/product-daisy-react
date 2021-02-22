import React from 'react';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  render() {
    const items = this.props.cart.map( (item, index) => {
      return (<CartItem 
                {...item} 
                key={item.id + '_' + index}
                removeFromCart={this.props.removeFromCart} 
                itemIndex={index}
              />)
    })
    return (
      <div className="Cart">
        <h3>Cart</h3>
        <ul>{items}</ul> 
      </div>
      
    )
  }
}

function CartItem(props) {
  return (
    <li>
      {props.name}
      <span onClick={() => props.removeFromCart(props.itemIndex)}>&nbsp;&nbsp;X</span>
  </li>
  )
}