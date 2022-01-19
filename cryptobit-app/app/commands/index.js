import * as messaging from 'messaging';


// get list item
export function getListItem(id) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      command: 'getListItem',
      id: id,
    });
  }
}
// get list data
export function getListData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      command: 'getListData',
    });
  }
}
// get list item
export function getSettingsItem(id) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      command: 'getSettingsItem',
      id: id,
    });
  }
}
// get list data
export function getSettingsData() {
  console.log("ik kom hier !!");
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      command: 'getSettingsData',
    });
  }
}


// set up
export function init() {
  messaging.peerSocket.addEventListener('open', () => {
    getListData();
    getSettingsData();
  });
}