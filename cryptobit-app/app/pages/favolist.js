import document from 'document';
import { switchPage } from '../navigation';
import { getSettingsData } from '../commands';
import { getStateItem, setStateCallback, removeStateCallback, setStateItem } from '../state';

let myList = null;

function draw() {
  let list = getStateItem('settingsData');
  console.log("Hello favolist");

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
          switchPage('replace', true);
        };
      }
    }
  };

  // length must be set AFTER delegate
  myList.length = list.length;
}

export function destroy() {
  myList = null;
  console.log("Byebye favolist");
  removeStateCallback('favolist', draw)
}

export function init() {
  myList = document.getElementById("myList");

  getSettingsData();
  setStateCallback('favolist', draw)
}