var negative = false;
var f = document.getElementById('Fahrenheit');
var c = document.getElementById('Celsius');

var fTemps = new Array;
var cTemps = new Array;
var convert = document.getElementById('convert');
var average = document.getElementById('average');
var reset = document.getElementById('reset');
document.addEventListener("keydown", submit);
var results = document.getElementById('results');


function submit(event) {
  if (event.keyCode == 13)
    convert.click();
}


function convertTemp() {
  var fTemp = parseInt(f.value);
  fTemps.push(fTemp);
  var cTemp = (fTemp - 32) * 5 / 9;
  cTemp = Math.floor((cTemp * 100) + .5) / 100;
  cTemps.push(cTemp);
  var cBox = document.getElementById('Celsius');
  cBox.value = cTemp;
  results.value = results.value + fTemp.toFixed(2).toString().padStart(9, " ") + '    ' + cTemp.toFixed(2).toString().padStart(9, " ") + '\r\n';
  convert.disabled = true;
  average.disabled = false;
  negative = false;
  f.value = '';
  f.focus();

  if (fTemps.length == 10)
    averageTemp();
}
function diableButt() {
  convert.disabled = true;
  average.disabled = true;
  reset.setAttribute('style', 'visibility: hidden;');
  f.value = '';
  f.disabled = false;
  c.value = '';
  results.value = '';
  f.focus();



}
function inputControl(event) {
  var inputChar = event.keyCode;
  var res = false;
  console.log(f.value);
  if (inputChar == 8) {
    if (f.value == '-') {
      negative = false;
      f.setAttribute('maxlength', '4');
    }
    res = true;
  } else if (negative == false && f.value == '' && (inputChar == 189 || inputChar == 109)) {
    f.setAttribute('maxlength', '5');
    negative = true;
    res = true;
  } else if (inputChar >= 48 && inputChar <= 57) {
    res = true;
  } else
    res = false;
  console.log(f.value);
  if (res && inputChar != 189 && inputChar != 109 && inputChar != 8) {
    convert.disabled = false;
    average.disabled = true;
  } else if (inputChar == 8 && f.value.length == 1) {
    convert.disabled = true;
  }
  return res;
}
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
  results.value = results.value + '============================================\r\n' + fAverage.toFixed(2).toString().padStart(9,' ') + '    ' + cAverage.toFixed(2).toString().padStart(9," ") + '\r\n';
  average.disabled = true;
  convert.disabled = true;
  f.value = '';
  var cBox = document.getElementById('Celsius');
  cBox.value = '';
  f.disabled = true;
  reset.setAttribute('style', 'visibility: visible;');
  reset.focus();
  cTemps = [];
  fTemps = [];
}
