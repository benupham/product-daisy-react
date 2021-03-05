export const imagesURL = window.location.href === "http://0.0.0.0:3000/" ? "./images/" : "https://s3-us-west-1.amazonaws.com/consumerland/";

export const GRID_WIDTH = 150;
export const GRID_HEIGHT = 150;

export const GRID_UNIT_SIZE = [200,200]; 
const UNIT_MARGIN = 25;

export const typeSize = {
  "product" : [2,4],
  "brand" : [3,2],
  "subdept" : [4,2],
  "dept" : [3,3]
}

export const typePixelSize = {
  "product" : [typeSize["product"][0]*GRID_UNIT_SIZE[0], typeSize["product"][1]*GRID_UNIT_SIZE[1]],
  "brand" : [typeSize["brand"][0]*GRID_UNIT_SIZE[0], typeSize["brand"][1]*GRID_UNIT_SIZE[1]],
  "subdept" : [typeSize["subdept"][0]*GRID_UNIT_SIZE[0], typeSize["subdept"][1]*GRID_UNIT_SIZE[1]],
  "dept" : [typeSize["dept"][0]*GRID_UNIT_SIZE[0], typeSize["dept"][1]*GRID_UNIT_SIZE[1]]
}

export const rectPosition = {
  "product" : [UNIT_MARGIN/2,UNIT_MARGIN/2],
  "brand" : [UNIT_MARGIN/2,UNIT_MARGIN/2],
  "subdept" : [UNIT_MARGIN/2,UNIT_MARGIN/2],
  "dept" : [UNIT_MARGIN/2,UNIT_MARGIN/2]
}

export const rectSize = {
  "product" : [typePixelSize["product"][0] - UNIT_MARGIN, typePixelSize["product"][1] - UNIT_MARGIN],
  "brand" : [typePixelSize["brand"][0] - UNIT_MARGIN, typePixelSize["brand"][1] - UNIT_MARGIN],
  "subdept" : [typePixelSize["subdept"][0] - UNIT_MARGIN, typePixelSize["subdept"][1] - UNIT_MARGIN],
  "dept" : [typePixelSize["dept"][0] - UNIT_MARGIN, typePixelSize["dept"][1] - UNIT_MARGIN]
}

export const imageSize = {
  "product" : typePixelSize["product"][0] - UNIT_MARGIN,
  "brand" : typePixelSize["brand"][1] - UNIT_MARGIN,
  "subdept" : typePixelSize["subdept"][1] - UNIT_MARGIN,
  "dept" : typePixelSize["dept"][1] - UNIT_MARGIN
}

export const imagePosition = {
  "product" : [UNIT_MARGIN/2,UNIT_MARGIN/2],
  "brand" : [typePixelSize["brand"][0]/2 + UNIT_MARGIN/2,UNIT_MARGIN/2],
  "subdept" : [typePixelSize["subdept"][0]/2 + UNIT_MARGIN/2,UNIT_MARGIN/2],
  "dept" : [0,0]
}

export const strokeColor = {
  "product" : "white",
  "brand" : "lightgray",
  "subdept" : "lightgray",
  "dept" : "lightgray"
}

export const rectFill = {
  "product" : "#fff",
  "brand" : "#fff",
  "subdept" : "#fff",
  "dept" : "#fff"
}

export const rectFilter = {
  "product" : "url(#dropshadow)",
  "brand" : "url(#dropshadow)",
  "subdept" : "url(#dropshadow)",
  "dept" : "url(#dropshadow)"
}

export const nameFontSize = {
  "product" : 18 * typeSize.product[0],
  "brand" : 24 * typeSize.brand[0],
  "subdept" : 30 * typeSize.subdept[0],
  "dept" : 42 * typeSize.dept[0]
}

export const nameAnchor = {
  "product" : "start",
  "brand" : "start",
  "subdept" : "start",
  "dept" : "middle"
}

export const nameAlignment = {
  "product" : "start",
  "brand" : "middle",
  "subdept" : "middle",
  "dept" : "middle"
}

export const namePosition = {
  "product" : [22,GRID_UNIT_SIZE[1] + 22],
  "brand" : [UNIT_MARGIN*2,typePixelSize["brand"][1]/2 + nameFontSize["brand"]/2],
  "subdept" : [UNIT_MARGIN*2,typePixelSize["subdept"][1]/2],
  "dept" : [typePixelSize["dept"][0]/2,typePixelSize["dept"][1]/2]
}

export const nameWidth = {
  "product" : rectSize["product"][0] - UNIT_MARGIN/2,
  "brand" : rectSize["brand"][0]/2,
  "subdept" : rectSize["subdept"][0]/2,
  "dept" : 250
}

export const nameMaxLen = {
  "product" : 50,
  "brand" : 50,
  "subdept" : 50,
  "dept" : 50
}


export function renderCSSVariables() {
  return (
  `
  :root {
    --unit-width: ${GRID_UNIT_SIZE[0]}px;
    --unit-height: ${GRID_UNIT_SIZE[1]}px;
    --unit-margin: ${UNIT_MARGIN}px;
    --dept-width: ${typePixelSize.dept[0]}px;
    --dept-height: ${typePixelSize.dept[1]}px;
    --subdept-width: ${typePixelSize.subdept[0]}px;
    --subdept-height: ${typePixelSize.subdept[1]}px;
    --brand-width: ${typePixelSize.brand[0]}px;
    --brand-height: ${typePixelSize.brand[1]}px;
    --product-width: ${typePixelSize.product[0]}px;
    --product-height: ${typePixelSize.product[1]}px;
  
  }
  `);

}