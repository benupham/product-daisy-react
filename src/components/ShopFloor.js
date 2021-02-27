import React from 'react';
import * as d3 from 'd3';
import Product from './Product';
import ProductCategory from './ProductCategory';
import { GRID_WIDTH, GRID_UNIT_SIZE, GRID_HEIGHT } from '../constants' ;

const initialScale = 0.5
const zoomWidth = -((GRID_WIDTH * GRID_UNIT_SIZE) * (1-initialScale)/2);
const zoomHeight = -((GRID_HEIGHT * GRID_UNIT_SIZE) * (1-initialScale)/2);
const initialZoom = d3.zoomIdentity.translate(zoomWidth, zoomHeight).scale(initialScale);

export default class ShopFloor extends React.Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.gRef = React.createRef();

    this.state= {
      viewBox: {x:0,y:0,w:500,h:500},
      svgSize: {w: 500, h: 500},
      scale: 1,
      isPanning: false, 
      startPoint: {x:0,y:0},
      endPoint: {x:0,y:0},
      container: {width: 1000, height: 1000},
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.setState({
      container: {width, height},
    })

    const svg = d3.select(this.svgRef.current);
    svg.call(this.handleZoom).call(this.handleZoom.transform, initialZoom);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = (e) => {
    const height = this.svgRef.current.clientHeight;
    const width = this.svgRef.current.clientWidth;

    this.setState({
      container: {width, height},
    });    
  }

  handleZoom = d3.zoom().on('zoom', e => {
      const g = d3.select(this.gRef.current);
      g.attr('transform', d3.event.transform)
  })

  render() {
    const items = this.props.items.map((item, index) => {
      if (item.type !== 'product') {
        return (
          <ProductCategory  
            {...item}
            itemIndex={index}
            addChildren={this.props.addChildren}
            removeDescendants={this.props.removeDescendants}
            key={item.id}
          />
        )
      } else {
        return (
          <Product 
            {...item} 
            key={item.id}
            itemIndex={index} 
            addToCart={this.props.addToCart}
          />
        )
      }
    }
    );

    return (
      <div className="ShopFloor">
        <svg 
          width={this.state.container.width} height={this.state.container.height} 
          ref={this.svgRef}>
          <g className="zoomContainer" ref={this.gRef}>
            {items}
          </g> 
        </svg>
      </div>
    );  
  }
}



