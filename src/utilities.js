import * as d3plus from 'd3plus-text';
import * as d3 from 'd3';
import { nameFontSize, nameWidth } from './constants';                      

export function wrapName(item, name, type) {
  const container = d3.select(item);
  console.log(container)
  new d3plus.TextBox()
    .data([{text: name, width: nameWidth[type]}])
    // .fontSize(nameFontSize[type])
    .select(item)
    .render();
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