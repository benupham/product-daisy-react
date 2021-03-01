import * as d3 from 'd3';
import { GRID_WIDTH, GRID_UNIT_SIZE, GRID_HEIGHT } from './constants' ;

const initialScale = 0.5
const zoomWidth = -((GRID_WIDTH * GRID_UNIT_SIZE) * (1-initialScale)/2) + 1000;
const zoomHeight = -((GRID_HEIGHT * GRID_UNIT_SIZE) * (1-initialScale)/2) + 1000;
// console.log('zoomWidth, zoomHeight',zoomWidth, zoomHeight)
// const initialZoom = d3.zoomIdentity.translate(zoomWidth, zoomHeight).scale(initialScale);

let svg, g; 
export const d3var = {};

export function setUpZoom(zoomContainerNode, zoomedNode) {
  svg = d3.select(zoomContainerNode);
  g = d3.select(zoomedNode);
  svg.call(handleZoom);
  g.on('click', function() {
    console.log('svg coor click', d3.mouse(this))
    // Quick and dirty passing to React of SVG coord
    d3var.clicked = d3.mouse(this);
  })
}

const handleZoom = d3.zoom().scaleExtent([0.1,7]).translateExtent([[5000,5000],[20000,20000]]).on('zoom', e => {
  g.attr('transform', d3.event.transform)
});


export function zoomToBounds(bounds, duration = 750) {

  const [[x0, y0], [x1, y1]] = bounds;
    
  // https://bl.ocks.org/iamkevinv/0a24e9126cd2fa6b283c6f2d774b69a2
  var dx = x1 - x0,
    dy = y1 - y0,
    x = (x0 + x1) / 2,
    y = (y0 + y1) / 2,
    scale = Math.min(0.9, Math.min(8, 0.9 / Math.max(dx / window.innerWidth, dy / window.innerHeight))),
    translate = [window.innerWidth / 2 - scale * x, window.innerHeight / 2 - scale * y];
  
  svg.transition().duration(duration).call(
    handleZoom.transform,
    d3.zoomIdentity
      .translate(translate[0], translate[1]).scale(scale)
  );

}