import document from 'document';
import clock from 'clock';
import { preferences } from 'user-settings';
import { init as initState, getStateItem, setStateCallback } from './state';
import zeroPad from './utils/zero-pad';

// init state
initState();

// elements
const $letter = document.getElementById('letter');
const $price = document.getElementById('price');
const $time = document.getElementById('time');
const $day = document.getElementById('day');
const $date = document.getElementById('date');

const dagen = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT",]

// define vars for later use;
let time = '';

var d = new Date();

// draw
function draw() {
  $time.text = time;
  $letter.text = getStateItem('cryptoName');
  $price.text = "€" + getStateItem('cryptoPrice');
  $day.text = "€" + getStateItem('cryptoPrice');
  $date.text = "€" + getStateItem('cryptoPrice');
  $date.text = d.getDate();
  $day.text = dagen[d.getDay()];
}





// time
clock.granularity = 'seconds'; // seconds if you like to show seconds or update stats every second, minutes if you only need it minutely
function updateTime(datetime) {
  const minute = datetime.getMinutes();
  const hour = datetime.getHours();
  let hours = hour;
  if (preferences.clockDisplay === '12h') {
    // 12h format
    hours = zeroPad(hours % 12 || 12);
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  const mins = zeroPad(minute);
  time = `${hours}:${mins}`;

  // draw every second to show time changes
  draw();
}
// use function above on clock tick
clock.ontick = (evt) => updateTime(evt.date);
// use the function on start as well
updateTime(new Date());

// draw whenever a change in state happens
setStateCallback(draw);

// draw when code loaded
draw();