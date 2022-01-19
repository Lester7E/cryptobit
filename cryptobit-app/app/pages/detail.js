import document from 'document';
import { getListItem } from '../commands';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';

let $button = null;
let $locationName = null;
let $cryptoName = null;
let $cryptoChange = null;
let $arrowUp = null;
let $arrowDown = null;

function doSomething() {
  console.log('hallo detail');
}

function draw() {
  const item = getStateItem('listItem');
  console.log(JSON.stringify(item));

  $locationName.text = "€" + item.price;
  $cryptoName.text = item.name;
  $cryptoChange.text = item.change;
  if ($cryptoChange.text.charAt(0) === "-") {
    $arrowDown.style.display = "inline";
    $arrowUp.style.display = "none";
  } else {
    $arrowUp.style.display = "inline";
    $arrowDown.style.display = "none";
  }
}

export function destroy() {
  console.log('destroy detail page');
  $locationName = null;
  $cryptoName = null;
  $button = null;
  $arrowUp = null;
  $arrowDown = null;
  removeStateCallback('detail');
}

export function init() {
  console.log('init detail page');
  $locationName = document.getElementById('location');
  $cryptoName = document.getElementById('cryptoName');
  $button = document.getElementById('button-1');
  $cryptoChange = document.getElementById('change');
  $arrowUp = document.getElementById('up');
  $arrowDown = document.getElementById('down');
  
  $button.onclick = () => {
    destroy();
    document.history.back();
  };

  doSomething();
  getListItem(getStateItem('detailId'));
  setStateCallback('detail', draw);
  // draw();
}