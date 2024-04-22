import Component from '../basic-components/component';
import Header from './header';
import Filter from './filter';
import MessageWindow from './messageWindow';
import Footer from './footer';
import API from '../../api/api';
import { div, ul } from '../basic-components/tags';
import socket from '../../api/socket';
import { getDomElements } from '../../utils/getDomElement';

console.log(socket);

class Main extends Component {
  #msgWindow;

  constructor() {
    super('div', 'main', new Header());
    this.#msgWindow = new MessageWindow();
    this.appendChildren(
      div(
        'main__middle',
        div('msg-wrapper', new Filter(), div('user-list', ul('active-users'), ul('inactive-users'))),
        this.#msgWindow
      ),
      new Footer()
    );
    new API().getOnlineUsers();
    new API().getOfflineUsers();
    this.setListener('click', (e) => this.changeMsgWindow(e));
  }

  changeMsgWindow(e: Event) {
    const element = e.target;
    if (element instanceof HTMLElement && element.closest('.users-item')) {
      const login = element.closest('.users-item')?.children[0].textContent || '';
      const isOnline = element.closest('.active-users') !== null;
      const newWindow = new MessageWindow(login, isOnline);
      this.#msgWindow.getNode().replaceWith(newWindow.getNode());
      this.#msgWindow = newWindow;
      new API().getMessages(login);
      getDomElements('.users-item').forEach((x) => x.classList.remove('active'));
      element.closest('.users-item')?.classList.add('active');
    }
  }
}

export default Main;
