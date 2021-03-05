import * as d3plus from 'd3plus-text';
import { nameFontSize, nameWidth } from './constants';                      

export function wrapName(node, name, type) {
  new d3plus.TextBox()
    .data([{text: name}])
    .fontSize(nameFontSize[type])
    .width(nameWidth[type])
    .padding('10px 15px')
    .select(node)
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