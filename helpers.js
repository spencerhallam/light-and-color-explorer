const colorRangeInput = document.querySelectorAll('.colorInput');

// const hueA = parseInt(document.getElementById("rangeOne").value);
// console.log('hueA TEST1: ', hueA + typeof hueA);
// const satA = parseInt(document.getElementById("rangeTwo").value);
// console.log('satA TEST1: ', satA + typeof satA);
// const valA = parseInt(document.getElementById("rangeThree").value);
// console.log('valA TEST1: ', valA + typeof valA);
// const ltsrc = parseInt(document.getElementById("tempPicker").value);
// console.log('ltsrc TEST1: ', ltsrc + typeof ltsrc);

const hueA = document.getElementById("rangeOne");
console.log('hueA TEST1: ', hueA.value + typeof hueA);
const satA = document.getElementById("rangeTwo");
console.log('satA TEST1: ', satA.value + typeof satA);
const valA = document.getElementById("rangeThree");
console.log('valA TEST1: ', valA.value + typeof valA);
const ltsrc = document.getElementById("tempPicker");
console.log('ltsrc TEST1: ', ltsrc.value + typeof ltsrc);


for (var i = 0; i < colorRangeInput.length; i++) {
     colorRangeInput[i].addEventListener('input', function(){lightObject(hueA, satA, valA, ltsrc)});
    // colorRangeInput[i].addEventListener('input', function(){lightObject(hueA, 102, 103, 104)});
  }

//function lightObject(inHue = 360, inSat = 80, inVal = 50, lightTemp = 127.5){
function lightObject(inHue, inSat, inVal, lightTemp){    
    //Check arguments
console.log('inHue', inHue + typeof inHue); 
console.log('inSat', inSat + typeof inSat); 
console.log('inVal', inVal + typeof inVal);  
console.log('lightTemp', lightTemp + typeof lightTemp);

  const hueStart = 39
  const hueMidPt = hueStart + 180;
  const hueEnd = hueStart + 360;
  const hueAVal = parseInt(inHue.value);
  const satAVal = parseInt(inSat.value);
  const valAVal = parseInt(inVal.value);

  //Set RGB values from LightSource Slider
  const sourceR = lightTemp;
  const sourceG = 90 + ((75/255)*lightTemp.value);
  const sourceB = 255 - lightTemp.value;

  //Get HSL values returned as and object
  const temperature = RGBToHSL(sourceR, sourceG, sourceB);

  //set starter Values to be reassigned in conditional statements below
  let tempAdd = hueAVal;
  let tempSat = satAVal;
  
  //SET CUBE HUE BASED ON COLOR TEMPERATURE:
  
  //Set new hue based on light source if orginal hue has blue/green harmony 
    if( hueAVal <= hueMidPt ){
        let tempConst = .004*temperature.srcSat;
        //If light is Blue
        if ( temperature.srcHue === hueMidPt ){
         //set cooler temperature 
         let diffA = hueMidPt - hueAVal
         let tempAddCalc = hueAVal + (diffA*tempConst);
         tempAdd = parseInt(tempAddCalc);
         
         //Neutralize the complimentary color
         let neutralize = (diffA/180)*temperature.srcSat;
         tempSat = parseInt(satAVal - neutralize);
        }
        //If light is Yellow
        if ( temperature.srcHue === hueStart ){
         //set warmer temperature
         let diffB = hueAVal - hueStart
         let tempAddCalc = hueAVal - (diffB*tempConst);
         tempAdd = parseInt(tempAddCalc);
         
         //Neutralize the complimentary color
         let neutralize = (diffB/180)*temperature.srcSat;
         tempSat = parseInt(satAVal - neutralize);
        }
        
      }
      
      //Set new hue based on light source if orginal hue has violet/magenta/red harmony
      if( hueAVal >= hueMidPt ){
        
        //If light is blue
        if ( temperature.srcHue === hueMidPt ){
          let diffC = hueAVal - hueMidPt
          let tempAddCalc = hueAVal - (diffC*tempConst);
          tempAdd = parseInt(tempAddCalc); 
         
          //Neutralize the complimentary color
         let neutralize = (diffC/180)*temperature.srcSat;
         tempSat = parseInt(satAVal - neutralize);
        }
    
        //If light is Yellow
        if ( temperature.srcHue === hueStart ){
          let diffD = hueEnd - hueAVal
          let tempAddCalc = hueAVal + (diffD*tempConst);
          tempAdd = parseInt(tempAddCalc); 
    
          //Neutralize the complimentary color
         let neutralize = (diffD/180)*temperature.srcSat;
         tempSat = parseInt(satAVal - neutralize);
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
  
//   const grdValOne = parseInt(gdVal*(6/7));
//   const grdValSix = parseInt(gdVal*(2/7));
  
  
  //HSL Colors Saved To Variables
  const hslOne = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValOne + '%)';  
  const hslTwo = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValTwo + '%)';
  const hslThree = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValThree + '%)';
  const hslFour = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValFour + '%)';
  const hslFive = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValFive + '%)';
  const hslSix = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValSix + '%)';
//   const hslSeven = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValOne + '%)';
//   const hslEight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)';
//   const hslNine = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)';
  
//   const refLight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + (grdValOne*(4/7)) + '%)';
//   const bkgdLight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)';
  
  
  console.log("hslOne: ", hslOne)
  console.log("hslTwo: ", hslTwo)
  console.log("hslThree: ", hslThree)
  console.log("hslFour: ", hslFour)
  console.log("hslFive: ", hslFive)
  console.log("hslSix: ", hslSix)

  hilite.style.fill = hslOne;
  ltside.style.fill = hslTwo;
  midtone.style.fill = hslThree;
  gradA.style.stopColor = hslFour;//was refLight
  gradB.style.stopColor = hslSix;
  dkmidtone.style.fill = hslFour;
  dkstmidtone.style.fill = hslFive;

  return {vOne: hslOne, vTwo: hslTwo, vThree: hslThree, vFour: hslFour, vFive: hslFive, vSix: hslSix};
//   console.log(hslSeven = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValOne + '%)')
//   console.log(hslEight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)')
//   console.log(hslNine = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)')
//   console.log(refLight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + (grdValOne*(4/7)) + '%)')
//   console.log(bkgdLight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)')
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
const cubeOne = lightObject(hueA, satA, valA, ltsrc);
console.log('cubeOne', cubeOne);
console.log('valueOne', cubeOne.vOne);

//lightObject(hueA.value, 200, valA.value, ltsrc.value);
//lightObject();
