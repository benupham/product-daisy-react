import React from 'react';
import '../css/Category.css';
import { d3var } from '../zoom';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.gRef = React.createRef();
    this.state = {
      dontRender: false,
    } 
  }

  componentDidMount() {
    const bounds = this.gRef.current.getBoundingClientRect();
    // The first time categories render, the viewport is the svg, not the screen
    // so we have to skip those 
    this.setState({ dontRender: this.props.parent === 0 ? false : isOutOfViewport(bounds)});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.windowSize !== this.props.windowSize) {
      console.log(this.gRef.current)
      const bounds = this.gRef.current.getBoundingClientRect();
      // The first time categories render, the viewport is the svg, not the screen
      // so we have to skip those 
      this.setState({ dontRender: this.props.parent === 0 ? false : isOutOfViewport(bounds)});
    }
  }


  handleClick = e => {
    const isOpen = this.props.isOpen;
    const itemId = this.props.id;
    const clicked = d3var.clicked;
    
    if (isOpen) {
      this.props.removeDescendants(itemId);
    } else {
      this.props.addChildren(itemId, clicked);
    }
    
  }

  render() {
    if (this.state.dontRender) return null;
    
    const x = this.props.x;
    const y = this.props.y; 
    const sponsoredClass = this.props.sponsored ? 'sponsored' : '';
    const open = this.props.isOpen ? 'open' : '';

    return (
      <g className={`Category`} 
        onClick={e => this.handleClick(e)} 
        transform={`translate(${x}, ${y})`}
         
      >
        <rect ref={this.gRef} className={`wrap ${this.props.type} ${sponsoredClass + ' ' + open}`}></rect>
        <text>{this.props.name} 
        {this.props.sponsored ? 'spon' : ''}
        </text>  
      </g>
    );

  }
}

const isOutOfViewport = function (bounds) {

  const out = {};
  out.left = bounds.left < 0 && bounds.right < 0;
  out.right = bounds.right > window.innerWidth && bounds.left > window.innerWidth;
  out.top = bounds.top > window.innerHeight;
  out.bottom = bounds.bottom < 0;


	return (out.left || out.right) || (out.top || out.bottom)

};