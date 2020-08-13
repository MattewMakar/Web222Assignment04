var f = document.getElementById('Fahrenheit');
var c = document.getElementById('Celsius');
var results = document.getElementById('results');

var fTemps = new Array;
var cTemps = new Array;

var convert = document.getElementById('convert');
var average = document.getElementById('average');
var reset = document.getElementById('reset');


document.addEventListener("keydown", submit);

//=====================================================================================
//the enter key control 
//=====================================================================================
function submit(event) {
  if (event.keyCode == 13)
    convert.click();
}
//=====================================================================================
//Covert function
//=====================================================================================

function convertTemp() {
  var fTemp = parseInt(f.value);
  fTemps.push(fTemp);
  var cTemp = (fTemp - 32) * 5 / 9;
  cTemp = Math.floor((cTemp * 100) + .5) / 100;
  cTemps.push(cTemp);
  c.value = cTemp;
  results.value = results.value + fTemp.toFixed(2).toString().padStart(9, " ") + '    ' + cTemp.toFixed(2).toString().padStart(9, " ") + '\r\n';
  convert.disabled = true;
  average.disabled = false;
  f.value = '';
  f.setAttribute('maxlength', '4');
  f.focus()
  if (fTemps.length == 10)
    averageTemp();
}
//=====================================================================================
//disable all
//=====================================================================================
function diableButton() {
  convert.disabled = true;
  average.disabled = true;
  reset.setAttribute('style', 'visibility: hidden;');
  f.value = '';
  f.disabled = false;
  c.value = '';
  results.value = '';
  f.focus();
}
//=====================================================================================
//only degits and negative sign and rset the size on back space
//=====================================================================================
function inputControl(event) {
  var inputChar = event.key;
  console.log(inputChar)
  var res = false;
  if (inputChar === "Backspace" && f.value === '-') {
    f.setAttribute('maxlength', '4');
    res = true;
  } else if (!f.value && inputChar === '-') {
    f.setAttribute('maxlength', '5');
    res = true;
  } else if ((inputChar >= '0' && inputChar <= '9') || inputChar == "Backspace") {
    res = true;
  } else
    res = false;

  (res && inputChar != '-' && inputChar != "Backspace") && (convert.disabled = false) && (average.disabled = true);
  (inputChar == "Backspace" && f.value.length == 1) && (convert.disabled = true);

  return res;
}


//=====================================================================================
//average function
//=====================================================================================
function averageTemp() {
  var cAverage = 0;
  var fAverage = 0;
  for (var i = 0; i < cTemps.length; i++) {
    cAverage += cTemps[i];
    fAverage += fTemps[i];
  }
  cAverage /= cTemps.length;
  fAverage /= cTemps.length;
  fAverage = Math.floor((fAverage * 100) + .5) / 100;
  cAverage = Math.floor((cAverage * 100) + .5) / 100;
  results.value = results.value + '============================================\r\n' + fAverage.toFixed(2).toString().padStart(9, ' ') + '    ' + cAverage.toFixed(2).toString().padStart(9, ' ') + '\r\n';
  f.value = '';
  c.value = '';
  average.disabled = true;
  convert.disabled = true;
  f.disabled = true;
  cTemps = [];
  fTemps = [];
  reset.setAttribute('style', 'visibility: visible;');
  reset.focus();
}
