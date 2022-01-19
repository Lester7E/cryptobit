import * as cbor from 'cbor';
import { outbox } from 'file-transfer';
import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { data } from './data';

let data = [];

const baseURL = 'https://api.coinranking.com/v2/coins';
const apiKey = 'coinranking091f5a5ea38278e572ebe29b5e6e3138adaa4db5b6556f77';

const proxyURL = 'https://cors-anywhere.herokuapp.com/';

fetch(`${proxyURL}${baseURL}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${apiKey}`,
        'Access-Control-Allow-Origin': '*'
    }

}).then((response) => {
    if (response.ok) {
        response.json().then((json) => {
            // console.log(json.data.coins);json.data.coins.length
            for (let i = 0; i < 21; i++) {
                let name = json.data.coins[i].name;
                let value = json.data.coins[i].name;
                let price = parseFloat(json.data.coins[i].price).toFixed(2);
                let change = json.data.coins[i].change;
                let idF = json.data.coins[i].rank;
                let id = idF.toString();
                
                // let iconUrl = json.data.coins[i].iconUrl;
                data.push({ name, value, price, change, id});
            }
            console.log(data);
        })
    }
})

/* Send Data */
function getListData() {
  let listData = [];
  for (let i = 0; i < data.length; i++) {
    let name = data[i].name;
    let idNumb = data[i].id
    let id = idNumb.toString();
    listData.push({name, id})
  }

  

  // const listData = data.map((item) => {
  //   return {
  //     name: item.name,
  //     id: item.id,
  //   }
  // });

  outbox
    .enqueue('listData.cbor', cbor.encode( { listData } ))
    .then(() => console.log('listData sent'))
    .catch((error) => console.log(`send error: ${error}`));
}

/* Send Data */
function getListItem(id) {
  let listItem = data.find((item) => {
    return id === item.id
  })

  outbox
    .enqueue('listItem.cbor', cbor.encode({ listItem }))
    .then(() => console.log('listItem sent'))
    .catch((error) => console.log(`send error: ${error}`));
}

/* Settings */
function sendSettings() {
  let settings = settingsStorage.getItem('cryptoList');

  outbox
    .enqueue('settings.cbor', cbor.encode(settings))
    .then(() => console.log('settings sent'))
    .catch((error) => console.log(`send error: ${error}`));
}

settingsStorage.addEventListener('change', sendSettings);

let settingsString = settingsStorage.getItem('cryptoList');
let settings = JSON.parse(settingsString);

setInterval(function(){ 
  settingsString = settingsStorage.getItem('cryptoList');
  settings = JSON.parse(settingsString);
}, 5000);


/* Settings */
function getSettingsData() {

  let settingsData = settings.map((item) => {
    return {
      name: item.name,
      id: item.id,
    }
  });

  outbox
    .enqueue('settingsData.cbor', cbor.encode( {settingsData} ))
    .then(() => console.log('settings sent'))
    .catch((error) => console.log(`send error: ${error}`));
}

/* Send Settings */
function getSettingsItem(id) {

  let settingsItem = settings.find((item) => {
    return id === item.id
  })

  outbox
    .enqueue('settingsItem.cbor', cbor.encode({ settingsItem }))
    .then(() => console.log('settingsItem sent'))
    .catch((error) => console.log(`send error: ${error}`));
}

/* Sending short messages */
function sendShortMessage() {
  const data = {
    companionTimestamp: new Date().getTime(),
  };

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

messaging.peerSocket.addEventListener('open', () => {
  setInterval(sendShortMessage, 10000);
});

messaging.peerSocket.addEventListener('error', (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

/* Handle messages coming from device */
function processMessaging(evt) {
  console.log(evt.data);
  switch (evt.data.command) {
    case 'getSettingsItem':
      getSettingsItem(evt.data.id);
      break;
    case 'getSettingsData':
      getSettingsData();
      break;
    case 'getListItem':
      getListItem(evt.data.id);
      break;
    case 'getListData':
      getListData();
      break;
    default:
      //
      break;
  }
}

messaging.peerSocket.addEventListener('message', processMessaging);