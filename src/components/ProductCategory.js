import React from 'react';

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
    return (
      <g onClick={() => this.handleClick()} transform="translate(50,50)"
      >
        <text>{this.props.name} {this.props.sponsored ? 'spon' : ''}</text>
      </g>
    );

  }
}
