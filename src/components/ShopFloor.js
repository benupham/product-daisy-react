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
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.setState({
      container: {width, height},
    })

    setUpZoom(this.svgRef.current, this.gRef.current, this.handleZoomEnd);
  }

  handleZoomEnd = () => {
    console.log('yea it is')
    this.setState({
      windowSize: [window.innerWidth,window.innerHeight],  
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



