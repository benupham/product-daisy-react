import React from 'react';
import '../css/ProductCategory.css';

export default class ProductCategory extends React.Component {

  handleClick = e => {
    const isOpen = this.props.isOpen;
    console.log(isOpen);
    // const itemIndex = this.props.itemIndex;
    const itemId = this.props.id;
    if (isOpen) {
      this.props.removeDescendants(itemId);
    } else {
      this.props.addChildren(itemId);
    }
    
  }

  render() {
    const x = this.props.x;
    const y = this.props.y; 
    return (
      <g className={`ProductCategory`} onClick={() => this.handleClick()} transform={`translate(${x}, ${y})`}
      >
        <rect className={`wrap ${this.props.type}`}>
          <text>{this.props.name} {this.props.sponsored ? 'spon' : ''}</text>
        </rect>  
      </g>
    );

  }
}
