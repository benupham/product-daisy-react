import React from 'react';
import Lozenge from './Lozenge';
import OmniboxSearch from './OmniboxSearch'

export default class Omnibox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  render() {
    const lozenges = this.props.lozenges.map( lozenge => {
      return <Lozenge 
                {...lozenge} 
                removeDescendants={this.props.removeDescendants}
                key={lozenge.id}  
                />
    })
    lozenges.reverse();
    
    return(
      <div>
        <h3>Omnibox</h3>
        <OmniboxSearch
          searchProducts={this.props.searchProducts}
        />
        {lozenges}
      </div>

    )
  }
}

