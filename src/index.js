import React from 'react';
import ReactDOM from 'react-dom';
import { fetchAll, fetchChildren, fetchSearch, fetchSponsored, updateAllLocations } from './api/api';
import Buttons from './components/Buttons';
import Cart from './components/Cart';
import Omnibox from './components/Omnibox';
import ShopFloor from './components/ShopFloor';
import { firstSet, GRID_CENTER, renderCSSVariables, secondSet } from './constants';
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
      titleBars: [],
      cart: [],
      isLoaded: false,
      grid: initGridCells(),
      lastClicked: null,
    }
  }

  componentDidMount() {
    
    renderCSSVariables();

    fetchAll()
    .then(data => {
      if (data.length === 0) return;

      const origin = GRID_CENTER;

      const deptData = data.filter(d => d.type === 'dept');
      const [grid,items,titleBars] = groupToGridGroup(origin, deptData, this.state.grid,{id: 0, name: 'All Departments', type: 'all'});

      this.setState({
        items,
        grid,
        titleBars,
        data:data,
        isLoaded: true,
        lastClicked: null,
      });
      
      // const csv = convertCSV(finalResults.items);
      // console.log(csv);

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
      zoomToBounds([[0,0],[grid[grid.length-1].x,grid[grid.length-1].y]], 1500);
      

    });
  }

  addChildren = (parentId, clickPos=null) => {
    fetchChildren(parentId)    
    .then(async data => {
      if (data.length > 0) {
        if (data[0].type === 'product') {
          data = await this.injectSponsoredCrap(data);
        }
  
        const oldItems = [...this.state.items];
        const index = oldItems.findIndex(item => item.id === parentId);
        const parent = {...oldItems[index], isOpen: true};
        const origin = clickPos ? {x: clickPos[0], y: clickPos[1]} : parent; 
        const [grid, newItems, titleBar] = groupToGridGroup(origin, data, this.state.grid, parent);
        const items = [...oldItems, ...newItems];
        const titleBars = [...this.state.titleBars, ...titleBar];
        items[index] = parent;

        this.setState({
          items,
          grid,
          titleBars,
          lastClicked: parent,
        });
        console.log('items, titlebars',items,titleBars)
        const bounds = newItems[0].groupGridBounds;
        // zoomToBounds(bounds);
        
       // this.addLozenge(parent, bounds);
      }
    });
  };

  displayEverything = (data, grid, items, titleBars) => {
    // console.log('items length: ',items.length);
    for (let i = 0; i < items.length; i++) {
      if (items[i].type !== 'product' && items[i].isOpen !== true) {
        const newItems = data.filter(d => d.parent === items[i].id);
        if (newItems.length === 0) continue;
        items[i].isOpen = true;
        const results = groupToGridGroup(items[i], newItems, grid, items[i]);
        // console.log('results',results);
        grid = results[0];
        items = [...items,...results[1]];
        console.log(items.length + 'of ' + data.length);
        titleBars = [...titleBars,...results[2]];
        return this.displayEverything(data,grid,items,titleBars);
      }
      
    }
    this.setState({items,grid,titleBars});
  }

  addLozenge(item, bounds) {
    const lozenge = {childrenBounds: bounds, ...item};
    this.setState({ 
      lozenges: this.state.lozenges.concat([lozenge]), 
    });  
  }

  removeDescendants = (parentId) => {
    if (parentId === 0) return;
    // This may need to be a deep copy to avoid state mutants
    const items = [...this.state.items];
    const titleBar = this.state.titleBars.filter(tb => tb.id === parentId)[0];
    const titleBars = this.state.titleBars.filter(tb => tb.id !== parentId);
    console.log('titlebar',titleBar)
    const lozenges = this.state.lozenges.filter(loz => loz.id !== parentId);
    const parentIndex = items.findIndex(item => item.id === parentId);
    // This is a category we're removing, not search results
    if (parentIndex >= 0) {
      let parent = {...this.state.items[parentIndex]};
      parent.isOpen = false; 
      items[parentIndex] = parent;
    }
    const grid = [...this.state.grid];
    
    this.recursiveDescedantRemoval(titleBars, parentId, grid);
    this.unsetGridCells(grid,titleBar.cells);
    this.recursiveDescedantRemoval(items, parentId, grid);
    this.recursiveDescedantRemoval(lozenges, parentId);

    this.setState({
      items,
      lozenges,
      grid,
      titleBars,
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
    .then(async searchData => {
      if (searchData.length > 0) {
        console.log('initial results',searchData)
        searchData = await this.injectSponsoredCrap(searchData);
        searchData.forEach(searchResult => {
          searchResult.id = searchResult.id + '-' + queryId;
          searchResult.parent = queryId;
        }); 
        const lastClicked = this.state.lastClicked;
        const origin = lastClicked ? {x: lastClicked.x, y: lastClicked.y} : {x: 15000, y: 15000};
        const [grid, newItems] = groupToGridGroup(origin, searchData, this.state.grid);

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

  injectSponsoredCrap = async (data) => {
    const qty = data.length > 3 ? 3 : data.length;
    const sponsored = await fetchSponsored('', data[0].subdept, 'product', '', qty);
    sponsored.forEach(item => {
      item.sponsored = true;
      item.parent = data[0].parent;
      item.id = item.id + '-spon-' + Date.now(); 
    })
    return [...data,...sponsored];
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
      <style>
        {renderCSSVariables()}
      </style>
        <Omnibox 
          items={this.state.items} 
          removeDescendants={this.removeDescendants}
          searchProducts={this.searchProducts}
          lozenges={this.state.lozenges}
        />
        <ShopFloor 
          items={this.state.items} 
          promoItems={this.state.promoItems}
          titleBars={this.state.titleBars}
          addChildren={this.addChildren} 
          removeDescendants={this.removeDescendants}
          addToCart={this.addToCart}
        />
        <Cart 
          cart={this.state.cart} 
          removeFromCart={this.removeFromCart}  
        />

        <Buttons
          depts={this.state.items.filter(i => i.type === 'dept')} 
          grid={this.state.grid}
          items={this.state.items}
          data={this.state.data}
          titleBars={this.state.titleBars}
          displayEverything={this.displayEverything}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

