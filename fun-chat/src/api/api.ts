import Controller from '../controller/controller';

const socket = new WebSocket('ws://localhost:4000');
let id = 1;

socket.onopen = function () {
  console.log('opened');
};

class API {
  constructor() {
    socket.onmessage = function (event) {
      const controller = new Controller();
      controller.checkData(event.data);
    };
  }

  sendLogin(login: string, pass: string) {
    id++;
    const data = {
      id: `${id}`,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login,
          password: pass,
        },
      },
    };
    socket.send(JSON.stringify(data));
  }
}

export default API;
