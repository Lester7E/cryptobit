import document from 'document';
import { switchPage } from '../navigation';

let $buttonFavo = null;
let $buttonList = null;

function doSomething() {
  console.log('hallo index');
}

export function destroy() {
  console.log('destroy index page');
  $buttonFavo = null;
  $buttonList = null;
}

export function init() {
  console.log('init index page');
  $buttonFavo = document.getElementById('favoButton');
  $buttonList = document.getElementById('listButton');

  $buttonFavo.onclick = () => {
    switchPage('favolist', true);
  };
  $buttonList.onclick = () => {
    switchPage('cryptolist', true);
  };

  doSomething();
}