import * as d3plus from 'd3plus-text';                    
import { GRID_UNIT_SIZE, nameVerticalAlign, nameFontSize, nameWidth, typeSize } from './constants';

export function wrapName(node, props) {
  const {name, type} = props;
  const width = type === 'overlay' ? Math.abs(props.bounds[1][0] - props.x): nameWidth[type];
  const fontResize = type === 'overlay' ? true : false;
  const height = type === 'overlay' ? GRID_UNIT_SIZE[0] : typeSize[type][1] * GRID_UNIT_SIZE[0];
  const fontSize = type === 'overlay' ? GRID_UNIT_SIZE[0] :  nameFontSize[type];
  const verticalAlign = nameVerticalAlign[type];
  const padding = type === 'product' ? '10px 15px' : '0';
   
  new d3plus.TextBox()
    .data([{text: name}])
    .fontResize(fontResize)
    .fontSize(fontSize)
    .verticalAlign(verticalAlign)
    .fontMax(GRID_UNIT_SIZE[0])
    .width(width)
    .height(height)
    .padding(padding)
    .select(node)
    .render();
}

export function exportCSV(items) {
  let csv = "id,name,type,price,img,parent,dept,subdept,value,sale,x,y,width,height\n";
  const theCsv = items.reduce((acc,item) => {
    const { id,name,type,price,img,parent,dept,
      subdept,value,sale,x,y,bounds } = item;
    const width = Math.abs(bounds[1][0] - x);
    const height = Math.abs(bounds[1][1] - y);
    const n = name.replace(/"/g, '""'); 
    return acc += `${id},"${n}",${type},"${price}",${img},${parent},${dept},${subdept},${value},${sale},${x},${y},${width},${height}\n`;
  },csv);
  const theCsv2 = theCsv.replaceAll('null','');
  var pom = document.createElement('a');
  var blob = new Blob([theCsv2],{type: 'text/csv;charset=utf-8;'});
  var url = URL.createObjectURL(blob);
  pom.href = url;
  pom.setAttribute('download', 'items-'+items.length+'.csv');
  pom.click();
}

export function textFormatter(str, width, maxLength = null) {
  if (maxLength !== null) {
    str = str.length > maxLength ? str.substr(0, maxLength) + '...' : str;
  }
  if (str.length > width) {
    var p = width;
    while (p > 0 && (str[p] !== ' ' && str[p] !== '-')) {
      p--;
    }
    if (p > 0) {
      var left;
      if (str.substring(p, p + 1) === '-') {
        left = str.substring(0, p + 1);
      } else {
        left = str.substring(0, p);
      }
      var right = str.substring(p + 1);
      return [left, textFormatter(right, width, maxLength)];
    }
  }
 
  return [str,''];    
}