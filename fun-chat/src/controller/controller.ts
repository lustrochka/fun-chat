import { getDomElement } from '../utils/getDomElement';
import Router from '../router/router';
import UserList from '../components/main/user-list';
import { Items, ResponseType, UsersList, UsersData } from '../types';

const LOGIN_ERRORS: Items = {
  'incorrect password': 'Incorrect password',
  'a user with this login is already authorized': 'This user is already authorized',
};

const users: UsersList = { active: [], inactive: [] };

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
        users.active = parsedData.payload.users.filter((el: UsersData) => el.login !== currentLogin);
        break;
      case 'USER_INACTIVE':
        users.inactive = parsedData.payload.users;
        this.manageUsersList(users);
        break;
      default:
    }
  }

  manageLogin(data: ResponseType) {
    sessionStorage.clear();
    getDomElement('.modal').hidden = false;
    getDomElement('.error-message__text').textContent = `${LOGIN_ERRORS[data.payload.error]}`;
  }

  manageUsersList(data: UsersList) {
    const header = getDomElement('.header');
    header.insertAdjacentElement('afterend', new UserList(data).getNode());
  }
}

export default Controller;
