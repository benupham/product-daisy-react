import React from 'react';
import ReactDOM from 'react-dom';
import { fetchChildren, fetchSearch } from './api/api';
import Cart from './components/Cart';
import Omnibox from './components/Omnibox';
import ShopFloor from './components/ShopFloor';
import { grid } from './groupToGrid';
import './index.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      promoItems: [],
      lozenges: [],
      cart: [],
      isLoaded: false,
    }
    grid.init();
  }

  componentDidMount() {
    fetchChildren(0) // 0 is the parent of Departments
    .then(data => this.setState({ 
      items: this.state.items.concat(data),
      isLoaded: true, 
    }));
  }

  addChildren = (parentId) => {
    fetchChildren(parentId)
    .then(data => {
      if (data.length > 0) {
        let items = [...this.state.items.concat(data)];
        const index = items.findIndex(item => item.id === parentId);
        const parent = {...items[index], isOpen: true};
        items[index] = parent;

        this.setState({
          items,
        });

        this.addLozenge(parent, null);
      }
    });
  };

  addLozenge(item, query=null) {
    const lozenge = {...item};
    this.setState({ 
      lozenges: this.state.lozenges.concat([lozenge]), 
    });  
  }

  removeDescendants = (parentId) => {
    // This may need to be a deep copy to avoid state mutants
    let items = [...this.state.items]; 
    let lozenges = this.state.lozenges.filter(loz => loz.id !== parentId);
    const parentIndex = items.findIndex(item => item.id === parentId);
    // This is a category we're removing, not search results
    if (parentIndex >= 0) {
      let parent = {...this.state.items[parentIndex]};
      parent.isOpen = false; 
      items[parentIndex] = parent;
    }

    this.recursiveDescedantRemoval(items, parentId);
    this.recursiveDescedantRemoval(lozenges, parentId);
    this.setState({
      items,
      lozenges
    })  
  }
  
  recursiveDescedantRemoval = (items, parentId) => {
    for( let i = 0; i < items.length; i++){ 
      if ( items[i].parent === parentId) {
        if (items[i].isOpen) {
          this.recursiveDescedantRemoval(items, items[i].id);
        }
        items.splice(i, 1);
        i--;
      }
    }    
  }

  searchProducts = (query) => {
    const timestamp = Date.now();
    const queryId = query + '-' + timestamp;
    fetchSearch(query)
    .then(data => {
      data.forEach(product => {
        product.id = product.id + '-' + queryId;
        product.parent = queryId;
      });
      this.setState({ 
        items: this.state.items.concat(data),
      })

      const lozenge = {
        type: 'search',
        id: queryId,
        name: `"${query}"`,
        parent: null,
        qty: data.length,
      }
      this.addLozenge(lozenge);
    })
  }

  addToCart = (itemIndex) => {
    const item = {...this.state.items[itemIndex]};
    this.setState({
      cart: this.state.cart.concat([item])
    })
  }

  removeFromCart = (itemIndex) => {
    this.setState({
      cart: this.state.cart.filter((item, index) => index !== itemIndex)
    })
  }  

  render() {
    return (
      <div className="App">
        <Omnibox 
          items={this.state.items} 
          removeDescendants={this.removeDescendants}
          searchProducts={this.searchProducts}
          lozenges={this.state.lozenges}
          removeLozenge={this.removeLozenge}
        />
        <ShopFloor 
          items={this.state.items} 
          promoItems={this.state.promoItems}
          addChildren={this.addChildren} 
          removeDescendants={this.removeDescendants}
          addToCart={this.addToCart}
        />
        <Cart 
          cart={this.state.cart} 
          removeFromCart={this.removeFromCart}  
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
