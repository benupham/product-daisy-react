import React from 'react';
import ReactDOM from 'react-dom';
import { testItems } from './api/fakeData';
import { Cart } from './components/Cart';
import { Omnibox } from './components/Omnibox';
import { Product } from './components/Product';
import { ProductCategory } from './components/ProductCategory';
import './index.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      promoItems: [],
      cart: [],
      theGrid: [],
    }
  }

  componentDidMount() {
    this.fetchChildren(0)
    .then(data => this.setState({ items: this.state.items.concat(data) }));
  }

  async fetchChildren(parentId) {
    const url = `http://localhost:3001/children/${parentId}`;
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }
    return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.log('the error',err))
  }

  addChildren = async (parentId) => {
    this.fetchChildren(parentId)
    .then(data => {
      if (data.length > 0) {
        let items = [...this.state.items.concat(data)];
        const index = items.findIndex(item => item.id === parentId);
        items[index].isOpen = true;
        this.setState({ items });
      }
    });
  };

  removeDescendants = (itemIndex) => {
    // This may need to be a deep copy to avoid state mutants
    let items = [...this.state.items];
    let parent = {...items[itemIndex]};
    this.recursiveDescedantRemoval(items, parent);
    parent.isOpen = false; 
    items[itemIndex] = parent;
    this.setState({
      items: items,
    })  
  }

  recursiveDescedantRemoval = (items, parent) => {
    for( let i = 0; i < items.length; i++){ 
      if ( items[i].parent === parent.id) {
        if (items[i].isOpen) {
          this.recursiveDescedantRemoval(items, items[i]);
        }
        items.splice(i, 1);
        i--;
      }
    }    
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

class ShopFloor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const items = this.props.items.map((item, index) => {
      if (item.type !== 'product') {
        return (
          <ProductCategory  
            {...item}
            itemIndex={index}
            addChildren={this.props.addChildren}
            removeDescendants={this.props.removeDescendants}
            key={item.id}
          />
        )
      } else {
        return <Product 
                {...item} 
                key={item.id}
                itemIndex={index} 
                addToCart={this.props.addToCart}  
                />
      }
    }
    );

    return (
      <div className="ShopFloor">
        <ul>
          {items}
        </ul>
      </div>
    );  
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
