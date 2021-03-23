export const imagesURL = window.location.href === "http://0.0.0.0:3000/" ? "./images/" : "https://s3-us-west-1.amazonaws.com/consumerland/";

export const GRID_WIDTH = 700; // these need to be even numbers!
export const GRID_HEIGHT = 700;

export const GRID_UNIT_SIZE = [200,200]; 
export const GRID_CENTER = {x: GRID_WIDTH*GRID_UNIT_SIZE[0]/2, y: GRID_HEIGHT*GRID_UNIT_SIZE[1]/2};

const UNIT_MARGIN = 25;

export const typeSize = {
  "product" : [2,4],
  "brand" : [3,1],
  "subdept" : [6,2],
  "dept" : [12,4]
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
  "dept" : 42 * typeSize.dept[0],
  "overlay" : GRID_UNIT_SIZE[0],
}

export const nameAnchor = {
  "product" : "start",
  "brand" : "start",
  "subdept" : "start",
  "dept" : "middle"
}

export const nameVerticalAlign = {
  "product" : "top",
  "brand" : "middle",
  "subdept" : "middle",
  "dept" : "middle",
  "overlay" : "middle",
}

export const namePosition = {
  "product" : [22,GRID_UNIT_SIZE[1] + 22],
  "brand" : [UNIT_MARGIN*2,typePixelSize["brand"][1]/2 + nameFontSize["brand"]/2],
  "subdept" : [UNIT_MARGIN*2,typePixelSize["subdept"][1]/2],
  "dept" : [typePixelSize["dept"][0]/2,typePixelSize["dept"][1]/2]
}

export const nameWidth = {
  "product" : rectSize["product"][0] - UNIT_MARGIN/2,
  "brand" : rectSize["brand"][0] * 2/3,
  "subdept" : rectSize["subdept"][0] * 2/3,
  "dept" : 250,
}

export const nameMaxLen = {
  "product" : 50,
  "brand" : 50,
  "subdept" : 50,
  "dept" : 50
}

export const deptsClassLookup = {
"9" :	"sales",
"930" :	"produce",
"1965" :	"pantry",
"4550" :	"dairy---eggs",
"6138" :	"deli",
"7412" :	"bakery",
"8333" :	"snacks",
"11222" :	"frozen",
"12674" :	"beverages",
"15047" :	"meat---seafood",
"15601" :	"canned-goods",
"16343" :	"bulk",
"16985" :	"dry-goods---pasta",
"17785" :	"floral",
"17835" :	"international",
"18267" :	"breakfast",
"18872" :	"personal-care",
"23047" :	"babies",
"23511" :	"pets",
"23780" :	"household",
}

export const deptsList = [
  9,930,1965,4550,6138,
  7412,8333,11222,12674,15047,
  15601,16343,16985,17785,17835,
  18267,18872,23047,23511,23780
];

export const firstSet = [
  9,930,1965,4550,6138,
  7412,8333,11222,12674,15047,
  15601,16343,16985,17785,17835
]
export const secondSet = [18267,18872,23047,23511,23780];

export const deptsOrigins = {
  "9" :	1,
"930" :	2,
"1965" : 3,
"4550" : 4,
"6138" : 5,
"7412" : 6,
"8333" : 7,
"11222" :	8,
"12674" :	9,
"15047" :	10,
"15601" :	11,
"16343" :	12,
"16985" :	13,
"17785" :	14,
"17835" :	15,
"18267" :	16,
"18872" :	17,
"23047" :	18,
"23511" :	19,
"23780" :	20,
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