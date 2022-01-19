import * as cbor from 'cbor';
import { outbox } from 'file-transfer';
import { settingsStorage } from 'settings';

/* Settings */
function sendSettings() {
  const settings = {
    cryptoName: settingsStorage.getItem('cryptoName')
      ? JSON.parse(settingsStorage.getItem('cryptoName'))[0].name
      : '',
      cryptoPrice: settingsStorage.getItem('cryptoName')
      ? JSON.parse(settingsStorage.getItem('cryptoName'))[0].price
      : '',
    // add other settings here
  };

  console.log(settings);

  outbox
    .enqueue('settings.cbor', cbor.encode(settings))
    .then(() => console.log('settings sent'))
    .catch((error) => console.log(`send error: ${error}`));
}

settingsStorage.addEventListener('change', sendSettings);