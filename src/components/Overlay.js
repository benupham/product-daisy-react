import React from 'react';
import { GRID_UNIT_SIZE } from '../constants';

export default class Overlay extends React.Component {
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
      width = bounds[1][1] - x - GRID_UNIT_SIZE[0];
      height = bounds[1][1] - y - GRID_UNIT_SIZE[1];
    }

    return (
      <g>
        <rect x={x} y={y} width={width} height={height}/>
      </g>
    )
  } 

}