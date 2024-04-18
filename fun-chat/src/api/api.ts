import socket from './socket';

let id = 1;

class API {
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

  logOut() {
    id++;
    const login = sessionStorage.getItem('login');
    const pass = sessionStorage.getItem('pass');
    const data = {
      id: `${id}`,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login,
          password: pass,
        },
      },
    };
    socket.send(JSON.stringify(data));
  }

  getOnlineUsers() {
    id++;
    const isOpened = JSON.parse(sessionStorage.getItem('isOpened') || 'false');
    const login = sessionStorage.getItem('login') || '';
    const pass = sessionStorage.getItem('pass') || '';
    const data = {
      id: `${id}`,
      type: 'USER_ACTIVE',
      payload: null,
    };
    if (isOpened) socket.send(JSON.stringify(data));
    else {
      socket.addEventListener(
        'open',
        () => {
          this.sendLogin(login, pass);
          socket.send(JSON.stringify(data));
        },
        { once: true }
      );
    }
  }

  getOfflineUsers() {
    id++;
    const isOpened = JSON.parse(sessionStorage.getItem('isOpened') || 'false');
    const data = {
      id: `${id}`,
      type: 'USER_INACTIVE',
      payload: null,
    };
    if (isOpened) socket.send(JSON.stringify(data));
    else {
      socket.addEventListener('open', () => socket.send(JSON.stringify(data)), { once: true });
    }
  }

  sendMessage(text: string, user: string) {
    id++;
    const data = {
      id: `${id}`,
      type: 'MSG_SEND',
      payload: {
        message: {
          to: user,
          text,
        },
      },
    };
    socket.send(JSON.stringify(data));
  }

  getMessages(login: string) {
    id++;
    const data = {
      id: `${id}`,
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login,
        },
      },
    };
    socket.send(JSON.stringify(data));
  }
}

export default API;
