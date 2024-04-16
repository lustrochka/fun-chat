import Controller from '../controller/controller';

const socket = new WebSocket('ws://localhost:4000');
const controller = new Controller();
sessionStorage.setItem('isOpened', 'false');

socket.onopen = function () {
  console.log('opened');
  sessionStorage.setItem('isOpened', 'true');
};

socket.onmessage = function (event) {
  controller.checkData(event.data);
};

socket.onclose = function () {
  console.log('closed');
  sessionStorage.setItem('isOpened', 'false');
};

window.addEventListener('unload', () => sessionStorage.removeItem('isOpened'));

export default socket;
