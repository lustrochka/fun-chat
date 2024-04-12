import Router from './router/router';
import './styles.css';

new Router().changeUrl('/login');

window.addEventListener('click', () => {
  new Router().changePage();
});

window.addEventListener('popstate', () => {
  new Router().changePage();
});

/* let socket = new WebSocket('ws://localhost:4000');

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
} */
