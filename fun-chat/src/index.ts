import LoginPage from './components/login-page/login-page';
import './styles.css';

const app = new LoginPage();
document.querySelector('body')?.appendChild(app.getNode());

/*let socket = new WebSocket('ws://localhost:4000');

let d1 = {
  id: '1',
  type: 'USER_LOGIN',
  payload: {
    user: {
      login: 'aaa',
      password: 'bbb',
    },
  },
};

let d2 = {
  id: '2',
  type: 'USER_LOGIN',
  payload: {
    user: {
      login: 'zzz',
      password: 'bbb',
    },
  },
};

let d3 = {
  id: '3',
  type: 'USER_ACTIVE',
  payload: null,
};

let d4 = {
  id: '4',
  type: 'USER_LOGOUT',
  payload: {
    user: {
      login: 'aaa',
      password: 'bbb',
    },
  },
};

let d5 = {
  id: '5',
  type: 'USER_LOGIN',
  payload: {
    user: {
      login: 'aaa',
      password: 'bb',
    },
  },
};

socket.onopen = function (e) {
  socket.send(JSON.stringify(d1));
  socket.send(JSON.stringify(d4));
  socket.send(JSON.stringify(d5));
};

socket.onmessage = function (event) {
  console.log(`[message] Данные получены с сервера: ${event.data}`, event , JSON.parse(event.data).payload);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    alert('[close] Соединение прервано');
  }
};

socket.onerror = function (error) {
  alert(`[error]`);
};*/
