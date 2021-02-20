import React from 'react';

export class Omnibox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  render() {

    return(
      <div>
        <h3>Omnibox</h3>
        <OmniboxSearch />
      </div>

    )
  }
}

class OmniboxSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.value);
    // something
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
        
    )

  }

}