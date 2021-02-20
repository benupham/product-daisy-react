import React from 'react';

export class ProductCategory extends React.Component {

  handleClick = e => {
    const isOpen = this.props.isOpen;
    console.log(isOpen);
    const itemIndex = this.props.itemIndex;
    const itemId = this.props.id;
    if (isOpen) {
      this.props.removeDescendants(itemIndex);
    } else {
      this.props.addChildren(itemId);
    }
    
  }

  render() {
    return (
      <li 
        onClick={() => this.handleClick()}
      >
        {this.props.name}
      </li>
    );

  }
}
