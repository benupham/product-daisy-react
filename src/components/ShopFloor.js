import React from 'react';
import Product from './Product';
import Category from './Category';
import Overlay from './Overlay';
import { setUpZoom } from '../zoom';

export default class ShopFloor extends React.Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.gRef = React.createRef();

    this.state= {
      container: {width: 1000, height: 1000},
      viewBox: [0, 0, 1000, 1000],
      transform: null,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.setState({
      container: {width, height},
      viewBox: [0, 0, width, height],
    })

    setUpZoom(this.svgRef.current, this.gRef.current, this.handleZoomEnd);
  }

  handleZoomEnd = (t) => {
    const viewBox = {
      x: - t.x / t.k, 
      y: - t.y / t.k,
      width: this.state.container.width / t.k,
      height: this.state.container.height / t.k
    }
    this.setState({
      viewBox,
      transform: t,  
    })
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

  render() {
    const items = this.props.items.map((item, index) => {
      if (isOutOfView(item, this.state.viewBox)) {return null;}
      if (item.type !== 'product') {
        return (
          <Category  
            {...item}
            itemIndex={index}
            addChildren={this.props.addChildren}
            removeDescendants={this.props.removeDescendants}
            key={item.id}
            windowSize={this.state.windowSize}
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
    const titles = this.props.titleBars.map((title, index) => {
      return (
        <Overlay
            {...title}
            itemIndex={index}
            key={title.id} 
        />    
      )
    })

    return (
      <div className="ShopFloor">
        <svg 
          width={this.state.container.width} height={this.state.container.height} 
          ref={this.svgRef}>
          <g className="zoomContainer" ref={this.gRef}>
            {titles}
            {items}
          </g> 
        </svg>
      </div>
    );  
  }
}

const isOutOfView = function (item, viewBox) {
  const bounds = item.bounds;
  const {x, y, width, height} = viewBox;
  const out = {};
  out.left = bounds[0][0] < x && bounds[1][0] < x;
  out.right = bounds[0][0] > (x + width) && bounds[1][0] > (x + width);
  out.top = bounds[1][1] < y;
  out.bottom = bounds[0][1] > (y + height);


	return (out.left || out.right || out.top || out.bottom)

};

