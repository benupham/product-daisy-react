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
       
      x = bounds[0][0];
      y = bounds[0][1];  
      width = Math.abs(bounds[1][0] - x);
      height = Math.abs(bounds[1][1] - y);
    }

    return (
      <g>
        <rect x={x} y={y} width={width} height={height}/>
      </g>
    )
  } 

}