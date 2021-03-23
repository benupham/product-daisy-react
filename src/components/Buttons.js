import React from 'react';
import { exportCSV } from '../utilities';
import { d3var } from '../zoom';

export default class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openBtns: [],
    }
  }

  handleClick = (dept) => {
    if (this.state.openBtns.includes(dept.id)) {
      this.setState({openBtns: this.state.openBtns.filter(b=>b !== dept.id)});
      // this.props.removeDescendants(dept.id);
      return;
    }
    this.setState({openBtns: [...this.state.openBtns,dept.id]});
    const deptData = {...dept};
    // deptData.x = d3var.clicked[0];
    // deptData.y = d3var.clicked[1];
    this.props.displayDept(deptData, d3var.clicked);
  }

  render() {
    const deptButtons = this.props.depts.map( (dept, index) => {
      return (<button  
                key={dept.id}
                onClick={()=> this.handleClick(dept)} 
                disabled={this.state.openBtns.includes(dept.id)}
              >{`${dept.name} (${dept.value})`}</button>)
    })
    return (
      <div className="Buttons">
          <button 
          onClick={() => {exportCSV(this.props.items)}}
          className={`export`}
          >Export</button>
        {deptButtons}

      </div>
      
    )
  }
}
