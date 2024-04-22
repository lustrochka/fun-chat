import { getDomElement, getDomElements } from '../utils/getDomElement';
import Router from '../router/router';
import UserList from '../components/main/user-list';
import MessageHistory from '../components/main/messageHistory';
import MessageItem from '../components/main/MessageItem';
import { Items, ResponseType, UsersData, MessageType, UnreadMsgsType } from '../types';
import { li, span } from '../components/basic-components/tags';
import API from '../api/api';

const LOGIN_ERRORS: Items = {
  'incorrect password': 'Incorrect password',
  'a user with this login is already authorized': 'This user is already authorized',
};

const users: UnreadMsgsType = { active: {}, inactive: {} };
let isRenderingUsers = false;
let endId: number;

class Controller {
  checkData(data: string) {
    console.log(data);
    const parsedData = JSON.parse(data);
    const currentLogin = sessionStorage.getItem('login') || '';

    switch (parsedData.type) {
      case 'ERROR':
        if (parsedData.payload.error in LOGIN_ERRORS) this.manageLogin(parsedData);
        break;
      case 'USER_LOGIN':
        if (window.location.pathname === '/login') new Router().changeUrl('/main');
        break;
      case 'USER_LOGOUT':
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('pass');
        new Router().changeUrl('/login');
        break;
      case 'USER_ACTIVE':
        users.active = Object.fromEntries(
          parsedData.payload.users
            .filter((el: UsersData) => el.login !== currentLogin)
            .map((el: UsersData) => [el.login, 0])
        );
        break;
      case 'USER_INACTIVE':
        users.inactive = Object.fromEntries(parsedData.payload.users.map((el: UsersData) => [el.login, 0]));
        this.getUnreadMessages(users, parsedData.id);
        break;
      case 'USER_EXTERNAL_LOGIN':
      case 'USER_EXTERNAL_LOGOUT':
        this.changeUsersStatus(parsedData.payload.user);
        break;
      case 'MSG_SEND':
        this.addMessage(parsedData.payload.message);
        break;
      case 'MSG_FROM_USER':
        isRenderingUsers
          ? this.addMessagesCount(parsedData.payload.messages, parsedData.id)
          : this.showMessages(parsedData.payload.messages);
        break;
      case 'MSG_READ':
        this.changeMsgStatus(parsedData.payload.message);
        break;
      case 'MSG_DELETE':
        this.deleteMessage(parsedData.payload.message.id);
        break;
      case 'MSG_EDIT':
        this.editMessage(parsedData.payload.message.id, parsedData.payload.message.text);
        break;
      case 'MSG_DELIVER':
        this.deliverMessage(parsedData.payload.message.id);
        break;
      default:
    }
  }

  manageLogin(data: ResponseType) {
    sessionStorage.clear();
    getDomElement('.modal').hidden = false;
    getDomElement('.error-message__text').textContent = `${LOGIN_ERRORS[data.payload.error]}`;
  }

  getUnreadMessages(data: UnreadMsgsType, id: string) {
    isRenderingUsers = true;
    endId = Number(id) + [...Object.keys(users.active), ...Object.keys(users.inactive)].length;
    Object.keys(data.active).forEach((user) => new API().getMessages(user));
    Object.keys(data.inactive).forEach((user) => new API().getMessages(user));
  }

  addMessagesCount(data: MessageType[], id: string) {
    data.forEach((x) => {
      if (!x.status.isReaded) {
        if (Object.keys(users.active).includes(x.from)) users.active[x.from]++;
        if (Object.keys(users.inactive).includes(x.from)) users.inactive[x.from]++;
      }
    });
    if (+id === endId) {
      isRenderingUsers = false;
      this.manageUsersList(users);
    }
  }

  manageUsersList(data: UnreadMsgsType) {
    getDomElement('.user-list').replaceWith(new UserList(data).getNode());
  }

  changeUsersStatus({ login, isLogined }: UsersData) {
    const active = getDomElement('.active-users');
    const inactive = getDomElement('.inactive-users');
    let targetUser = Array.from(getDomElements('.users-item')).filter((el) => el.children[0].textContent === login)[0];
    if (!targetUser) targetUser = li('users-item', span('name', login), span('count-messages', '')).getNode();
    isLogined ? active.appendChild(targetUser) : inactive.appendChild(targetUser);

    const msgTitle = getDomElement('.msg-window__title');
    if (msgTitle.textContent && msgTitle.textContent.length > 0) {
      msgTitle.textContent = `${msgTitle.textContent?.split(' ')[0]} ${isLogined ? 'Online' : 'Offline'}`;
    }
  }

  showMessages(data: MessageType[]) {
    const msgHistory = new MessageHistory(data);
    getDomElement('.msg-window__title').insertAdjacentElement('afterend', msgHistory.getNode());
    this.scrollHistory();
    // msgHistory.setListener('scroll', () => msgHistory.changeStatus(data));
  }

  addMessage(data: MessageType) {
    const msgHistory = document.querySelector<HTMLDivElement>('.msg-history');
    if (msgHistory) {
      msgHistory.appendChild(new MessageItem(data).getNode());
      this.scrollHistory();
    }
    getDomElements('.users-item').forEach((el) => {
      if (el.children[0].textContent === data.from) {
        const count = el.children[1].textContent || '0';
        el.children[1].textContent = `${Number(count) + 1}`;
      }
    });
  }

  scrollHistory() {
    const LINE_MARGIN = 30;
    try {
      const line = getDomElement('.new');
      const msgHistory = getDomElement('.msg-history');
      msgHistory.scrollTop =
        line.getBoundingClientRect().top + msgHistory.scrollTop - msgHistory.getBoundingClientRect().top - LINE_MARGIN; // + msgHistory.scrollTop;
    } catch {
      const msgHistory = document.querySelector<HTMLDivElement>('.msg-history');
      if (msgHistory) msgHistory.scrollTop = msgHistory.scrollHeight - msgHistory.offsetHeight;
    }
  }

  changeMsgStatus(data: { id: string; status: { isReaded: boolean } }) {
    try {
      const message = getDomElement(`#m${data.id}`);
      message.dataset.status = 'Readed';
      const status = message.children[2].lastChild;
      if (status && status.textContent) status.textContent = 'Readed';
      getDomElement('.new').classList.remove('new');
    } catch {}
  }

  deleteMessage(id: string) {
    try {
      getDomElement(`#m${id}`).remove();
    } catch {}
  }

  editMessage(id: string, text: string) {
    try {
      const message = getDomElement(`#m${id}`);
      const status = message.children[2].firstChild;
      if (status) status.textContent = 'Edited';
      message.children[1].textContent = text;
    } catch {}
  }

  deliverMessage(id: string) {
    try {
      const message = getDomElement(`#m${id}`);
      message.dataset.status = 'Delivered';
      const status = message.children[2].lastChild;
      if (status && status.textContent) status.textContent = 'Delivered';
    } catch {}
  }
}

export default Controller;
