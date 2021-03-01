import React from 'react';

export default class ProductCategoryOverlay extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    let x, y, width, height;
    if (this.props.bounds !== undefined && this.props.bounds.length > 0) {
      const bounds = this.props.bounds;
      console.log(bounds); 
      x = bounds[0][0];
      y = bounds[0][1];  
      width = bounds[1][1] - x;
      height = bounds[1][1] - y;
    }

    return (
      <g>
        <rect x={x} y={y} width={width} height={height}/>
      </g>
    )
  } 

}