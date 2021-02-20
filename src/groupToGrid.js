import { items } from ".";
import { GRID_WIDTH, GRID_HEIGHT, GRID_UNIT_SIZE, typeSize } from "./constants";

/* 

Based on snapToGrid.js, but where each item level group first arranges in square of optimal width/height
ratio, then positions itself as close as possible to its parent originator. The position of the parent 
and its group does not change. 

Steps:
1. Count # of objects in a group (dept, subdept, brand, products)
2. Calculate optimal square width/height based on object grid size (ie 1x2, 2x1 etc)
3. Run fitByType based on total grid size of that square
4. Update the position of all objects in the group based on final location of 0,0 square
5. Objects are positioned by their order in the array. This does not change. 

TO DO
-- improve calculation of placement of items by rippling from center instead of checking every cell
-- refactor for clarity between groups of items and single items

*/

export let grid = {
  cells : [],
  
  init : function() {
    this.cells = [];
    for(var i = 0; i < GRID_WIDTH; i++) {
      for(var j = 0; j < GRID_HEIGHT; j++) {
        var cell;
        cell = {
          x : i * GRID_UNIT_SIZE,
          y : j * GRID_UNIT_SIZE,
          occupied : false,
          pid: null,
          parent: null
        };
        this.cells.push(cell);
      };
    };
  },
  
  resetCells : function(occupiedCells) {
    occupiedCells.forEach(cellId =>{
      this.cells[cellId].occupied = false;
      this.cells[cellId].pid = null;
      this.cells[cellId].parent = null;  
    })
  },

  fitByType : function(cell) {
    //Instead of using the item (p) width/height, that is 
    // set with the itemsWidth/Height properties
    let candidate = [];
    let theWidth = this.itemsWidth;
    let theHeight = this.itemsHeight; 
    
    // Check that all points in a item type size are available 
    // TODO: change to use reduce()
    loop1 : // named loops can be broken by nested loop break commands
    for (let width = 0; width < theWidth; width++) {
      let xpoint = cell + (width * GRID_HEIGHT); 
      if (this.cells[xpoint] && !this.cells[xpoint].occupied) {
        candidate.push(xpoint);
        for (let height = 1; height < theHeight; height++) {
          let ypoint = xpoint + height;
          if (this.cells[ypoint] && !this.cells[ypoint].occupied) {
            candidate.push(ypoint)
          } else {
            candidate = false;
            break loop1;
          }
        }
      } else {
        candidate = false; 
        break loop1;
      } 
    }
    
    return candidate
  },

  itemsWidth : 0, // these should probaby not be on the class
  itemsHeight : 0,
  groupGridBounds : [],
  itemsType : null,
  itemsSize : [],

  snapToGrid : function(p) { 

    if (Array.isArray(p)) {

      // Create a rectangle/square big enough to fit all the items 
      // in array of items p...
      let typeWidth = typeSize[p[0].type][0];
      let typeHeight = typeSize[p[0].type][1];
      let totalUnits = p.length * typeWidth * typeHeight;
      let sqrt = Math.floor(Math.sqrt(p.length));

      if (typeWidth > typeHeight) {
        // console.log('width >= height')
        let itemsWidthUnits = sqrt * typeWidth;
        console.log('items',p.length,'totalunits', totalUnits, 'sqrt', sqrt, 'width in units',itemsWidthUnits);
        for (let i = 0; i < totalUnits; i++) {
          if (itemsWidthUnits * i * typeHeight >= totalUnits) {
            this.itemsHeight = i * typeHeight;
            this.itemsWidth = itemsWidthUnits;
            // console.log(this.itemsWidth)
            break;
          } 
        }
      } else {
        console.log('height > width')
        
        // Force product groups to be wider than tall.
        let itemsHeightUnits = Math.max(sqrt-1,1) * typeHeight;
        console.log('items',p.length,'totalunits', totalUnits, 'sqrt', sqrt, 'height in units',itemsHeightUnits);
        for (let i = 0; i < totalUnits; i++) {
          if (itemsHeightUnits * i * typeWidth >= totalUnits) {
            this.itemsWidth = i * typeWidth;
            this.itemsHeight = itemsHeightUnits;
            console.log(this.itemsWidth)
            break;
          } 
        }
      }
      
      // Then find the closest spot for that containing rectangle. 
      let groupGrid = this.occupyNearest(p);
      console.log('item grid',groupGrid);

      this.itemsType = p[0].type; 
      this.itemsSize = typeSize[this.itemsType];
      console.log("items size",this.itemsSize)
      
      // Define the size of the rect of items
      this.groupGridBounds = 
        [[this.cells[groupGrid[0]].x, 
        this.cells[groupGrid[0]].y],
        // these corners of the bounds take account
        // of the fact that items are irregular sizes
        [this.cells[groupGrid[groupGrid.length-1]].x + this.itemsSize[0] * GRID_UNIT_SIZE, 
        this.cells[groupGrid[groupGrid.length-1]].y + this.itemsSize[1] * GRID_UNIT_SIZE]];   
      console.log('grid bounds:',this.groupGridBounds)  

      // Now basically need to repeat the fitting process with
      // the space inside the containing rectangle for all the children of 
      // the clicked parent p 
      p.forEach( pr => {
        
        let type = pr.type;
        this.itemsWidth = typeSize[type][0];
        this.itemsHeight = typeSize[type][1]; 

        for (let i = 0; i < groupGrid.length; i++) {
          const groupCell = groupGrid[i];
          const candidate = this.fitByType(groupCell);
          if (candidate) {

            this.placeItem(pr, candidate, groupCell);

            break;
          }
          
        }

      })
        

    } else {
      // for fitting individual items (promos)
      console.log('p is not an array')

      let type = p.type;
      this.itemsWidth = typeSize[type][0];
      this.itemsHeight = typeSize[type][1];
      this.itemsType = type; 
      this.itemsSize = typeSize[type];

      let candidate = this.occupyNearest(p);
      this.placeItem(p, candidate);

    }

  },

  placeItem : function(item, locationCells, groupCell = null) {

    // the cells occupied by the item
    item.cells = [];

    locationCells.forEach( e => {
      this.cells[e].occupied = true;
      this.cells[e].pid = item.id;
      this.cells[e].parent = item.parent;
      item.cells.push(e);
    });
    // console.log('cell', cell)
    item.ix = item.x;
    item.iy = item.y;

    if (groupCell) {
      item.x = this.cells[groupCell].x;
      item.y = this.cells[groupCell].y;
      item.groupGridBounds = this.groupGridBounds;  
    } else {
      item.x = this.cells[locationCells[0]].x;
      item.y = this.cells[locationCells[0]].y;
    }

  },

  occupyNearest : function(p) {
    var minDist = 100000000;
    var d;
    let winner = [];

    const item = Array.isArray(p) ? p[0] : p;
    const isArray = Array.isArray(p) ? true : false;
    // if (!Array.isArray(p)) {
    //   console.log(p.name);
    // } 

    /* TODO: Rewrite as a search rippling out as
    concentric circles from the clicked item, return
    first match, rather than search through every grid coordinate.     
    */

    // Run through all the cells in the grid
    for(var cell = 0; cell < this.cells.length; cell++) {
      // See if the item would fit in that cell
      let candidate = this.fitByType(cell);
      
      // See if that location is closest to the current
      // location
      if (candidate && (d = this.sqdist2(item, candidate, isArray)) < minDist ) { 
        minDist = d;
        winner = candidate;
      }
    }
    if (winner.length > 0) {
      // if (!Array.isArray(p)) console.log('the winner ', winner);
      return winner
      
    } else {
      console.log('I guess the grid is full');
      return false
    }

  },

  sqdist : function(a, b) {    
    // return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    return Math.hypot(a.x - b.x, a.y - b.y);
  },

  // Finds the closest of any of the points in the group of
  // items 
  sqdist2 : function(item, candidate, isArray) {

    let a = item;

    

    return candidate.reduce((prev,current) => {
      let c = this.cells[current];
      return this.sqdist(a, c) < prev ? this.sqdist(a, c) : prev
    }, 99999999)

  },
}
