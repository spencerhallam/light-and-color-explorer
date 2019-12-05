const colorRangeInput = document.querySelectorAll('.colorInput');
const hueA = document.getElementById("rangeOne");
const satA = document.getElementById("rangeTwo");
const valA = document.getElementById("rangeThree");
const ltsrc = document.getElementById("tempPicker");
const grndHue = document.getElementById("gdHueSel");
const grndSat = document.getElementById("gdSatSel");
const grndVal = document.getElementById("gdValSel");

const initOne = "hsl(360, 99%, 84%)";
const initTwo = "hsl(360, 99%, 70%)";
const initThree = "hsl(360, 99%, 56%)";
const initFour = "hsl(360, 99%, 42%)";
const initFive = "hsl(360, 99%, 28%)";
const initSix = "hsl(360, 99%, 14%)";
const initSeven = "hsl(360, 5%, 95%)";
const initEight = "hsl(360, 5%, 36%)";
const initNine = "hsl(360, 5%, 14%)";

document.getElementById('hilite').style.fill = initOne;
  ltside.style.fill = initTwo;
  midtone.style.fill = initThree;
  gradA.style.stopColor = initSix;
  gradB.style.stopColor = initSix;
  dkmidtone.style.fill = initFive;
  dkstmidtone.style.fill = initSix;
  ground.style.fill = initSeven;
  shadow.style.fill = initEight;
  bkgrd.style.fill = initNine;


for (var i = 0; i < colorRangeInput.length; i++) {
  colorRangeInput[i].addEventListener('input', setColors);
}

//hueStart, sliderhue, slidersat, sliderval, tempslidervalue,

function setColors(){
  const hueStart = 39;//60
  const hueMidPt = hueStart + 180;
  const hueEnd = hueStart + 360;
  const hueAVal = parseInt(hueA.value);
  const satAVal = parseInt(satA.value);
  const valAVal = parseInt(valA.value);
  
  const gdHue = parseInt(grndHue.value);
  const gdSat = parseInt(grndSat.value);
  const gdVal = parseInt(grndVal.value);
  let grdHueAdd = gdHue;
  let grdSatAdd = gdSat;
  let grdValAdd = gdVal;
  
  //Set RGB vlues from LightSource Slider
  
  const sourceR = ltsrc.value;
  const sourceG = 90 + ((75/255)*ltsrc.value);
  const sourceB = 255 - ltsrc.value;
  
  let tempAdd = hueAVal;
  let tempSat = satAVal;
  
  
  //Get HSL values returned as and object
  const temperature = RGBToHSL(sourceR, sourceG, sourceB);
  
  //SET CUBE HUE BASED ON COLOR TEMPERATURE:
  
  //Set new hue based on light source if orginal hue has blue/green harmony 
  if( hueAVal <= hueMidPt ){
    
    //If light is Blue
    if (temperature.srcHue === hueMidPt ){
     //set cooler temperature 
     let diffA = hueMidPt - hueAVal
     let tempAddCalc = hueAVal + diffA*(.004*(temperature.srcSat));
     tempAdd = parseInt(tempAddCalc);
     
     //Neutralize the complimentary color
     let neutralize = (diffA/180)*(temperature.srcSat);
     tempSat = parseInt(satAVal - neutralize);
    }
    //If light is Yellow
    if (temperature.srcHue === hueStart ){
     //set warmer temperature
     let diffB = hueAVal - hueStart
     let tempAddCalc = hueAVal - diffB*(.004*(temperature.srcSat));
     tempAdd = parseInt(tempAddCalc);
     
     //Neutralize the complimentary color
     let neutralize = (diffB/180)*(temperature.srcSat);
     tempSat = parseInt(satAVal - neutralize);
    }
    
  }
  
  //Set new hue based on light source if orginal hue has violet/magenta/red harmony
  if( hueAVal >= hueMidPt ){
    
    //If light is blue
    if (temperature.srcHue === hueMidPt ){
      let diffC = hueAVal - hueMidPt
      let tempAddCalc = hueAVal - diffC*(.004*(temperature.srcSat));
      tempAdd = parseInt(tempAddCalc); 
     
      //Neutralize the complimentary color
     let neutralize = (diffC/180)*(temperature.srcSat);
     tempSat = parseInt(satAVal - neutralize);
    }

    //If light is Yellow
    if (temperature.srcHue === hueStart ){
      let diffD = hueEnd - hueAVal
      let tempAddCalc = hueAVal + diffD*(.004*(temperature.srcSat));
      tempAdd = parseInt(tempAddCalc); 

      //Neutralize the complimentary color
     let neutralize = (diffD/180)*(temperature.srcSat);
     tempSat = parseInt(satAVal - neutralize);
    }
    
  }
  
  //SET GROUND HUE BASED ON COLOR TEMPERATURE:
  
  //Set new hue based on light source if orginal hue has blue/green harmony 
  if( gdHue <= hueMidPt ){
    
    //If light is Blue
    if (temperature.srcHue === hueMidPt ){
     let diffA = hueMidPt - gdHue
     let grdCalc =  gdHue + diffA*(.004*(temperature.srcSat));
     grdHueAdd = parseInt(grdCalc);
      
     //Neutralize the complimentary color
     let neutralize = (diffA/180)*(temperature.srcSat);
     grdSatAdd = parseInt(gdSat - neutralize); 
    }

    //If light is Yellow
    if (temperature.srcHue === hueStart ){
     let diffB = gdHue - hueStart
     let grdCalc =  gdHue - diffB*(.004*(temperature.srcSat));
     grdHueAdd = parseInt(grdCalc);

     //Neutralize the complimentary color
     let neutralize = (diffB/180)*(temperature.srcSat);
     grdSatAdd = parseInt(gdSat - neutralize); 
    }
    
  }
  ////Set new hue based on light source if orginal hue has violet/magenta/red harmony
  if( gdHue >= hueMidPt ){
    
    //If light is blue
    if (temperature.srcHue === hueMidPt ){
     let diffC = gdHue - hueMidPt 
     let grdCalc =  gdHue - diffC*(.004*(temperature.srcSat));
     grdHueAdd = parseInt(grdCalc);

     //Neutralize the complimentary color
     let neutralize = (diffC/180)*(temperature.srcSat);
     grdSatAdd = parseInt(gdSat - neutralize);

    }
    //If light is Yellow 
    if (temperature.srcHue === hueStart ){
     let diffD = hueEnd - gdHue
     let grdCalc =  gdHue + diffD*(.004*(temperature.srcSat));
     grdHueAdd = parseInt(grdCalc);
    
    //Neutralize the complimentary color
     let neutralize = (diffD/180)*(temperature.srcSat);
     grdSatAdd = parseInt(gdSat - neutralize);

     }
  }

  //Get final "S" Value
  const finSatOne = 0;

  //Get final "L" Value
  const finValOne = parseInt(valAVal*(7/7));
  const finValTwo = parseInt(valAVal*(6/7));
  const finValThree = parseInt(valAVal*(5/7));
  const finValFour = parseInt(valAVal*(4/7));
  const finValFive = parseInt(valAVal*(3/7));
  const finValSix = parseInt(valAVal*(2/7));
  
  const grdValOne = parseInt(gdVal*(6/7));
  const grdValSix = parseInt(gdVal*(2/7));
  
  
  //HSL Colors Saved To Variables
  const hslOne = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValOne + '%)';  
  const hslTwo = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValTwo + '%)';
  const hslThree = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValThree + '%)';
  const hslFour = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValFour + '%)';
  const hslFive = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValFive + '%)';
  const hslSix = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValSix + '%)';
  const hslSeven = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValOne + '%)';
  const hslEight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)';
  const hslNine = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)';
  
  const refLight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + (grdValOne*(4/7)) + '%)';
  const bkgdLight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)';
  
  //Add Color To SVG Polygons
  polyOne.style.fill = hslOne;  
  polyTwo.style.fill = hslTwo;
  polyThree.style.fill = hslThree;
  polyFour.style.fill = hslFour;
  polyFive.style.fill = hslFive;
  polySix.style.fill = hslSix;
  
  //Render HSL Values
  hslOneVal.innerHTML = hslOne;  
  hslTwoVal.innerHTML = hslTwo;
  hslThreeVal.innerHTML = hslThree;
  hslFourVal.innerHTML = hslFour;
  hslFiveVal.innerHTML = hslFive;
  hslSixVal.innerHTML = hslSix;
  hslSevenVal.innerHTML = hslSeven;
  hslEightVal.innerHTML = hslEight;
  hslNineVal.innerHTML = hslNine;
  
  let lightTemp = 'hsl(' + temperature.srcHue + ', ' + temperature.srcSat + '%, ' + temperature.srcVal + '%)';
  scratch.style.backgroundColor = lightTemp; 
  
  hilite.style.fill = hslOne;
  ltside.style.fill = hslTwo;
  midtone.style.fill = hslThree;
  gradA.style.stopColor = refLight;
  gradB.style.stopColor = hslSix;
  dkmidtone.style.fill = hslFour;
  dkstmidtone.style.fill = hslFive;
  
  //Cube Rendering
  ground.style.fill = hslSeven;
  shadow.style.fill = hslEight;
  bkgrd.style.fill = bkgdLight;
  
  
}

//Convert RGB to HSL
function RGBToHSL(r,g,b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  
  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;
  
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  
  return { srcHue: h, srcSat: s, srcVal: l}
  //return "hsl(" + h + "," + s + "%," + l + "%)";
}
// var yoyo = RGBToHSL(20, 40, 60);

// console.log("A:", yoyo.srcHue);
// console.log("B:", yoyo.srcSat);
// console.log("C:", yoyo.srcVal);