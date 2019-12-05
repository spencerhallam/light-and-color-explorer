function lightObject(inputHue = 360, inputSat = 80, inputVal = 50, lightTemp = 127.5){

  const hueStart = 39
  const hueMidPt = hueStart + 180;
  const hueEnd = hueStart + 360;
  const hueAVal = parseInt(inputHue);
  const satAVal = parseInt(inputSat);
  const valAVal = parseInt(inputVal);

  //Set RGB values from LightSource Slider
  const sourceR = lightTemp;
  const sourceG = 90 + ((75/255)*ltsrc.value);
  const sourceB = 255 - ltsrc.value;

  //Get HSL values returned as and object
  const temperature = RGBToHSL(sourceR, sourceG, sourceB);

  //set starter Values to be reassigned in conditional statements below
  let tempAdd = hueAVal;
  let tempSat = satAVal;
  
  //SET CUBE HUE BASED ON COLOR TEMPERATURE:
  
  //Set new hue based on light source if orginal hue has blue/green harmony 
    if( hueAVal <= hueMidPt ){
        let tempConst = .004*tempConst;
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

  console.log(hslOne = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValOne + '%)')
  console.log(hslTwo = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValTwo + '%)')
  console.log(hslThree = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValThree + '%)')
  console.log(hslFour = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValFour + '%)')
  console.log(hslFive = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValFive + '%)')
  console.log(hslSix = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValSix + '%)')
  console.log(hslSeven = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValOne + '%)')
  console.log(hslEight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)')
  console.log(hslNine = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)')
  console.log(refLight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + (grdValOne*(4/7)) + '%)')
  console.log(bkgdLight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)')
}