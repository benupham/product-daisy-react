import React from 'react';
import * as d3 from 'd3';
import '../css/ProductCategory.css';
import { d3var } from '../zoom';

export default class ProductCategory extends React.Component {

  handleClick = e => {
    const isOpen = this.props.isOpen;
    const itemId = this.props.id;
    const clicked = d3var.clicked;
    console.log(clicked)
    if (isOpen) {
      this.props.removeDescendants(itemId);
    } else {
      this.props.addChildren(itemId, clicked);
    }
    
  }

  render() {
    const x = this.props.x;
    const y = this.props.y; 
    const sponsoredClass = this.props.sponsored ? 'sponsored' : '';
    const open = this.props.isOpen ? 'open' : '';

    return (
      <g className={`ProductCategory`} onClick={e => this.handleClick(e)} transform={`translate(${x}, ${y})`}
      >
        <rect className={`wrap ${this.props.type} ${sponsoredClass + ' ' + open}`}>
          <text>{this.props.name} {this.props.sponsored ? 'spon' : ''}</text>
        </rect>  
      </g>
    );

  }
}
