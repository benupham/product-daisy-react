const fs = require('fs');
console.log(process.cwd())

let items = JSON.parse(fs.readFileSync('./productSetv5.json'));

function findDept(items) { 

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
  //   if (item.type === 'brand') {
  //     item.subdept = item.parent; 
  //   }
    if (item.type === 'product') {
      
      for (let j = 0; j < items.length; j++) {
        const parent = items[j];
        if (parent.id === item.parent) {
          item.subdept = parent.subdept; 
        }
      }
    } 
  }
}

function getBrandnames(items) {
  let brands;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.type === 'brand') {
      brands += item.name + '|' + item.img + '\n';
    }
    
  }
  return brands

}

// findDept(items);
const brands = getBrandnames(items);
// fs.writeFileSync('./brands.txt', brands);
// fs.writeFileSync('./brands.json', JSON.stringify(items, null, 2));