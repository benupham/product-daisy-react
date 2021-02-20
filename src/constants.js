export const imagesURL = window.location.href === "http://0.0.0.0:3000/" ? "./images/" : "https://s3-us-west-1.amazonaws.com/consumerland/";

export const GRID_WIDTH = 150;
export const GRID_HEIGHT = 150;

export const GRID_UNIT_SIZE = 200; 
const UNIT_MARGIN = 25;

export const typeSize = {
  "product" : [1,2],
  "brand" : [2,1],
  "subdept" : [2,1],
  "dept" : [3,2]
}

export const typePixelSize = {
  "product" : [typeSize["product"][0]*GRID_UNIT_SIZE, typeSize["product"][1]*GRID_UNIT_SIZE],
  "brand" : [typeSize["brand"][0]*GRID_UNIT_SIZE, typeSize["brand"][1]*GRID_UNIT_SIZE],
  "subdept" : [typeSize["subdept"][0]*GRID_UNIT_SIZE, typeSize["subdept"][1]*GRID_UNIT_SIZE],
  "dept" : [typeSize["dept"][0]*GRID_UNIT_SIZE, typeSize["dept"][1]*GRID_UNIT_SIZE]
}

export const strokeColor = {
  "product" : "white",
  "brand" : "lightgray",
  "subdept" : "lightgray",
  "dept" : "lightgray"
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

export const nameFontSize = {
  "product" : 18,
  "brand" : 24,
  "subdept" : 30,
  "dept" : 42
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
  "product" : [22,GRID_UNIT_SIZE + 22],
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
