import React from 'react';
import ReactDOM from 'react-dom';
import { fetchChildren, fetchSearch, fetchSponsored } from './api/api';
import Cart from './components/Cart';
import Omnibox from './components/Omnibox';
import ShopFloor from './components/ShopFloor';
import { groupToGridGroup, initGridCells } from './groupToGrid';
import './index.css';
import { zoomToBounds } from './zoom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      promoItems: [],
      lozenges: [],
      cart: [],
      isLoaded: false,
      grid: initGridCells(),
      lastClicked: null,
    }
  }

  componentDidMount() {
    fetchChildren(0) // 0 is the parent of Departments
    .then(data => {
      if (data.length > 0) {
        const origin = {x: 15000, y: 15000};
        const [grid, items] = groupToGridGroup(origin, data, this.state.grid);

        this.setState({
          items,
          grid,
          isLoaded: true,
          lastClicked: items[0],
        });

        const bounds = items[0].groupGridBounds;
        const lozenge = {
          type: 'store',
          id: 0,
          name: `All Departments`,
          parent: null,
          qty: null,
          groupGridBounds: bounds, 
        }        
        this.addLozenge(lozenge, bounds);
        zoomToBounds(bounds, 100);
      }
    });
  }

  addChildren = (parentId) => {
    fetchChildren(parentId)
    // .then( async data => {
    //   const sponsored = await fetchSponsored(data);
    //   sponsored.forEach(item => {
    //     item.id = item.id + '-sponsored';
    //     item.sponsored = true; 
    //   })
    //   return [...sponsored,...data]
    // })     
    .then(data => {
      if (data.length > 0) {
        const oldItems = [...this.state.items];
        const index = oldItems.findIndex(item => item.id === parentId);
        const parent = {...oldItems[index], isOpen: true};
        // TODO: Change parent (origin) to mouseclick x y 
        const [grid, newItems] = groupToGridGroup(parent, data, this.state.grid);
        const items = [...oldItems, ...newItems];
        items[index] = parent;

        this.setState({
          items,
          grid,
          lastClicked: parent,
        });

        const bounds = newItems[0].groupGridBounds;
        zoomToBounds(bounds);
        
        this.addLozenge(parent, bounds);
      }
    });
  };

  addLozenge(item, bounds) {
    const lozenge = {childrenBounds: bounds, ...item};
    this.setState({ 
      lozenges: this.state.lozenges.concat([lozenge]), 
    });  
  }

  removeDescendants = (parentId) => {
    // This may need to be a deep copy to avoid state mutants
    const items = [...this.state.items];
    const lozenges = this.state.lozenges.filter(loz => loz.id !== parentId);
    const parentIndex = items.findIndex(item => item.id === parentId);
    // This is a category we're removing, not search results
    if (parentIndex >= 0) {
      let parent = {...this.state.items[parentIndex]};
      parent.isOpen = false; 
      items[parentIndex] = parent;
    }
    const grid = [...this.state.grid];

    this.recursiveDescedantRemoval(items, parentId, grid);
    this.recursiveDescedantRemoval(lozenges, parentId);
    this.setState({
      items,
      lozenges,
      grid
    })  
  }
  // TODO: Issues with removing search items and unsetting grid
  recursiveDescedantRemoval = (items, parentId, grid = null) => {
    for( let i = 0; i < items.length; i++){ 
      if ( items[i].parent === parentId) {
        if (items[i].isOpen) {
          this.recursiveDescedantRemoval(items, items[i].id);
        }
        if (grid) {
          console.log('cells',items[i].cells)
          this.unsetGridCells(grid, items[i].cells)
        }
        items.splice(i, 1);
        i--;
      }
    }    
  }

  unsetGridCells = (grid, occupiedCells) => {
    // const newGrid = [...grid];
    occupiedCells.forEach(cell => {
      const emptiedCell = {
        ...grid[cell],
        occupied: false,
        pid: null,
        parent: null,
      };
      grid[cell] = emptiedCell;
    })
    return grid; 
  }

  searchProducts = (searchQuery) => {
    const timestamp = Date.now();
    const queryId = searchQuery + '-' + timestamp;
    fetchSearch(searchQuery)
    .then(searchData => {
      if (searchData.length > 0) {
        searchData.forEach(searchResult => {
          searchResult.id = searchResult.id + '-' + queryId;
          searchResult.parent = queryId;
        }); 
        const lastClicked = this.state.lastClicked;
        const origin = lastClicked ? {x: lastClicked.x, y: lastClicked.y} : {x: 15000, y: 15000};
        const [grid, newItems] = groupToGridGroup(origin, searchData, this.state.grid);
        //console.log('items searchData',items)

        this.setState({
          items: this.state.items.concat(newItems),
          grid,
        });

        const lozenge = {
          type: 'search',
          id: queryId,
          name: `"${searchQuery}"`,
          parent: null,
          qty: searchData.length,
          groupGridBounds: lastClicked.groupGridBounds, //this won't work if a search is done first
        }
        const bounds = newItems[0].groupGridBounds;
        zoomToBounds(bounds);
        this.addLozenge(lozenge, bounds);
      }

    })
  }

  injectSponsoredCrap = async (itemsData, clickedItem, searchQuery) => {
    const sponsoredCrap = await fetchSponsored(clickedItem, searchQuery);
    console.log('sponsored crap', sponsoredCrap)
    itemsData = sponsoredCrap.concat(itemsData);
    return itemsData;
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
