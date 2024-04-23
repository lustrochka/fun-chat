import Controller from '../controller/controller';
import Router from '../router/router';
import ModalConnection from '../components/modalConnection/modalConnection';
import API from './api';

let socket: WebSocket;
const controller = new Controller();
const modal = new ModalConnection();

class Socket {
  setSocket() {
    socket = new WebSocket('ws://localhost:4000');
    sessionStorage.setItem('isOpened', 'false');
    socket.onopen = function () {
      modal.destroy();
      console.log('opened');
      sessionStorage.setItem('isOpened', 'true');
      if (sessionStorage.getItem('login'))
        new API().sendLogin(sessionStorage.getItem('login') || '', sessionStorage.getItem('pass') || '');
      new Router().changeUrl('/login');
    };

    socket.onmessage = function (event) {
      controller.checkData(event.data);
    };

    socket.onclose = () => {
      console.log('closed');
      sessionStorage.setItem('isOpened', 'false');
      document.body.appendChild(modal.getNode());
      this.setSocket();
    };
  }

  getSocket() {
    return socket;
  }
}

window.addEventListener('unload', () => sessionStorage.removeItem('isOpened'));

export default Socket;
