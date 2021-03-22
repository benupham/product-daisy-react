import React from 'react';
import { exportCSV } from '../utilities';

export default class Buttons extends React.Component {

  handleClick = (dept) => {
    const {grid,titleBars} = this.props;
    const data = this.props.data.filter(d => d.dept === dept.id);
    this.props.displayEverything(data, grid, [dept], titleBars)
  }

  render() {
    const deptButtons = this.props.depts.map( (dept, index) => {
      return (<button  
                key={dept.id}
                onClick={()=> this.handleClick(dept)} 
              >{`${dept.name} (${dept.value})`}</button>)
    })
    return (
      <div className="Buttons">
          <button 
          onClick={() => {exportCSV(this.props.items)}}
          className="export" 
          >Export</button>
        {deptButtons}

      </div>
      
    )
  }
}

function CartItem(props) {
  return (
    <li>
      {props.name}
      <span onClick={() => props.removeFromCart(props.itemIndex)}>&nbsp;&nbsp;X</span>
  </li>
  )
}