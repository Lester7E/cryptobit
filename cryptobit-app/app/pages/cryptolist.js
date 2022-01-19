import document from 'document';
import { switchPage } from '../navigation';
import { getListData } from '../commands';
import { getStateItem, setStateCallback, removeStateCallback, setStateItem } from '../state';

// let $buttonDetail = null;
// let $buttonReplace = null;
let myList = null;

function draw() {
  const list = getStateItem('listData');
  console.log("Hello cryptolist");

  myList.delegate = {
    getTileInfo: (index) => {
      return {
        type: "my-pool",
        value: list[index],
        index: index,
      };
    },
    configureTile: (tile, info) => {
      // console.log(`Item: ${info.index}`)
      if (info.type == "my-pool") {
        tile.getElementById("text").text = `${info.value.name}`;
        
        let touch = tile.getElementById("touch");
        touch.onclick = function() {
          setStateItem('detailId', info.value.id);
          switchPage('detail', true);
        };
      }
    }
  };

  // length must be set AFTER delegate
  myList.length = list.length;
}

export function destroy() {
  myList = null;
  console.log("Byebye cryptolist");
  removeStateCallback('cryptolist', draw)
}

export function init() {
  myList = document.getElementById("myList");

  getListData();
  setStateCallback('cryptolist', draw)
}