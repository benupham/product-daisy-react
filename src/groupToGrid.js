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





export function initGridCells() {
  const grid = [];
  for(let i = 0; i < GRID_WIDTH; i++) {
    for(let j = 0; j < GRID_HEIGHT; j++) {
      let cell;
      cell = {
        x : i * GRID_UNIT_SIZE[0],
        y : j * GRID_UNIT_SIZE[1],
        occupied : false,
        pid: null,
        parent: null
      };
      grid.push(cell);
    };
  };
  // console.log('grid initialized with ' + grid.length + ' cells')
  return grid;
}

function determineItemsGridSize(itemsType, itemsCount) {
  let typeWidth = typeSize[itemsType][0];
  let typeHeight = typeSize[itemsType][1];
  let totalUnits = itemsCount * typeWidth * typeHeight;
  let sqrt = Math.floor(Math.sqrt(itemsCount));

  let itemsGridHeight, itemsGridWidth;

  if (typeWidth > typeHeight) {
    let itemsWidthUnits = sqrt * typeWidth;
    // console.log('items',itemsCount,'totalunits', totalUnits, 'sqrt', sqrt, 'width in units',itemsWidthUnits);
    for (let i = 0; i < totalUnits; i++) {
      if (itemsWidthUnits * i * typeHeight >= totalUnits) {
        itemsGridHeight = i * typeHeight;
        itemsGridWidth = itemsWidthUnits;
        break;
      } 
    }
  } else {
    // Force item groups to be wider than tall.
    let itemsHeightUnits = Math.max(sqrt-1,1) * typeHeight;
    // console.log('items',itemsCount,'totalunits', totalUnits, 'sqrt', sqrt, 'height in units',itemsHeightUnits);
    for (let i = 0; i < totalUnits; i++) {
      if (itemsHeightUnits * i * typeWidth >= totalUnits) {
        itemsGridWidth = i * typeWidth;
        itemsGridHeight = itemsHeightUnits;
        break;
      } 
    }
  }
  return [itemsGridWidth, itemsGridHeight];
}

// Give items data from db, get their positions
// on the grid so they are grouped together
// and close to their parent category item 
// return the updated items data
export function groupToGridGroup(origin, itemsData, grid, oldItems) {
  
  const newGrid = [...grid];
  const itemsType = itemsData[0].type; 
  const itemsSize = typeSize[itemsType];
  // Calculate the size of the rect to contain
  // all the items returned 
  const [itemsGridWidth, itemsGridHeight] = determineItemsGridSize(itemsType, itemsData.length);

  // Then find the closest spot for that containing rectangle. 
  const groupGrid = findClosestPosition({x: origin.x, y: origin.y}, itemsGridWidth, itemsGridHeight, newGrid);
  // console.log('item grid',groupGrid);
  
  // Define the corner coordinates (bounds) of the rect of items
  const groupGridBounds = 
    [[newGrid[groupGrid[0]].x, 
    newGrid[groupGrid[0]].y],
    // this bottom corner of the bounds takes account
    // of the fact that item's position is their upper left corner
    // but they may extend multiple cells right and down
    [newGrid[groupGrid[groupGrid.length-1]].x + itemsSize[0] * GRID_UNIT_SIZE[0], 
    newGrid[groupGrid[groupGrid.length-1]].y + itemsSize[1] * GRID_UNIT_SIZE[1]]];   
  // console.log('grid bounds:',groupGridBounds)  

  // Now for each item in the group, position it
  // in an open space on the grid that is also
  // inside its shared group rect on the grid 
  itemsData.forEach( item => {
    
    const type = item.type;
    const itemWidth = typeSize[type][0];
    const itemHeight = typeSize[type][1]; 
    

    for (let i = 0; i < groupGrid.length; i++) {
      const groupCell = groupGrid[i];
      const candidate = fitByType(groupCell, newGrid, itemWidth, itemHeight);
      if (candidate) {
        addPositionData(newGrid, item, candidate, groupCell, groupGridBounds);
        setGridCells(newGrid, item);
        break;
      } 
    }
  })
  
  return [newGrid, itemsData]; 

}

// Replaces grid cells with item data
// and returns shallow copy of updated grid
function setGridCells(grid, item) {
    item.cells.forEach( cell => {
      const occupiedCell = {
        ...grid[cell],
        occupied: true,
        pid: item.id,
        parent: item.parent,
      };
      grid[cell] = occupiedCell;
    });

  return grid;
}

// Take single item data and get its position
// on the grid
export function groupToGridSingle(itemData, grid, origin) {
  const type = itemData.type;
  const itemWidth = typeSize[type][0];
  const itemHeight = typeSize[type][1];

  const candidate = findClosestPosition(origin, itemWidth, itemHeight, grid);
  if (candidate) {
    addPositionData(grid, itemData, candidate);
  } else {
    // console.log('no available point found for ' + itemData);
  }

  return itemData; 
  
}

// Given an origin point, find the closest available
// position from that origin for an item of width and height
function findClosestPosition(origin, itemsGridWidth, itemsGridHeight, grid) {
  let minDist = 100000000;
  let d;
  let winner = []; 
  
  /* TODO: Rewrite as a search rippling out as
  concentric circles from the clicked item, return
  first match, rather than search through every grid coordinate.     
  */
  // console.log('origin', origin)
  // Run through all the cells in the grid
  for(let cell = 0; cell < grid.length; cell++) {
    // See if the item(s) rect would fit if positioned at that cell
    let candidate = fitByType(cell, grid, itemsGridWidth, itemsGridHeight);
    
    
    // See if that location is closest to the current location
    if (candidate && (d = sqdist2(origin, candidate, grid)) < minDist) { 
      minDist = d;
      winner = candidate;
      
    }
  }
  if (winner.length > 0) {

    return winner;
    
  } else {
    console.log('I guess the grid is full');
    return false;
  }

}

// Given a cell in a grid, determines if an item of 
// certain width and height in cells starting at cell will fit
// (meaning the cells are not occupied) 
// and if so returns the cells it will fit into
function fitByType(cell, grid, toFitWidth, toFitHeight) {
  // We are determining whether there is open space
  // on the grid for the rect, starting at the cell
  let candidate = [];
  let theWidth = toFitWidth;
  let theHeight = toFitHeight; 
  
  // Check that all points in a item type size are available 
  // TODO: change to use reduce()
  loop1 : // named loops can be broken by nested loop break commands
  for (let width = 0; width < theWidth; width++) {
    let xpoint = cell + (width * GRID_HEIGHT); 
    if (grid[xpoint] && !grid[xpoint].occupied) {
      candidate.push(xpoint);
      for (let height = 1; height < theHeight; height++) {
        let ypoint = xpoint + height;
        if (grid[ypoint] && !grid[ypoint].occupied) {
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
}

// Adds position data to item data
function addPositionData(grid, itemData, locationCells, groupCell = null, groupGridBounds = null) {
  // the cells occupied by the item
  itemData.cells = locationCells;

  
  if (groupCell) {
    itemData.x = grid[groupCell].x;
    itemData.y = grid[groupCell].y;
    itemData.groupGridBounds = groupGridBounds;  
  } else {
    itemData.x = grid[locationCells[0]].x;
    itemData.y = grid[locationCells[0]].y;
  }
  itemData.ix = itemData.x;
  itemData.iy = itemData.y;

  return itemData;
}

// Finds the closest of any of the points in the group of
// items 
function sqdist2(origin, candidate, grid) {

  let a = origin;

  return candidate.reduce((prev,current) => {
    let c = grid[current];
    return sqdist(a, c) < prev ? sqdist(a, c) : prev
  }, 99999999)

}

function sqdist(a, b) {    
  return Math.hypot(a.x - b.x, a.y - b.y);
}
