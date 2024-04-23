import Socket from './socket';

let id = 1;

class API {
  socket;

  constructor() {
    this.socket = new Socket().getSocket();
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
    this.socket.send(JSON.stringify(data));
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
    this.socket.send(JSON.stringify(data));
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
    if (isOpened) this.socket.send(JSON.stringify(data));
    else {
      this.socket.addEventListener(
        'open',
        () => {
          this.sendLogin(login, pass);
          this.socket.send(JSON.stringify(data));
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
    if (isOpened) this.socket.send(JSON.stringify(data));
    else {
      this.socket.addEventListener('open', () => this.socket.send(JSON.stringify(data)), { once: true });
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
    this.socket.send(JSON.stringify(data));
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
    this.socket.send(JSON.stringify(data));
  }

  changeReadStatus(msgId: string) {
    id++;
    const data = {
      id: `${id}`,
      type: 'MSG_READ',
      payload: {
        message: {
          id: msgId,
        },
      },
    };
    this.socket.send(JSON.stringify(data));
  }

  deleteMessage(msgId: string) {
    id++;
    const data = {
      id: `${id}`,
      type: 'MSG_DELETE',
      payload: {
        message: {
          id: msgId,
        },
      },
    };
    this.socket.send(JSON.stringify(data));
  }

  editMessage(msgId: string, text: string) {
    id++;
    const data = {
      id: `${id}`,
      type: 'MSG_EDIT',
      payload: {
        message: {
          id: msgId,
          text,
        },
      },
    };
    this.socket.send(JSON.stringify(data));
  }
}

export default API;
