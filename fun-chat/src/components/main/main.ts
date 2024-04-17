import Component from '../basic-components/component';
import Header from './header';
import Filter from './filter';
import MessageWindow from './messageWindow';
import Footer from './footer';
import API from '../../api/api';
import { div } from '../basic-components/tags';

class Main extends Component {
  #msgWindow;

  constructor() {
    super('div', 'main', new Header());
    this.#msgWindow = new MessageWindow();
    this.appendChildren(div('main__middle', div('msg-wrapper', new Filter()), this.#msgWindow), new Footer());
    new API().getOnlineUsers();
    new API().getOfflineUsers();
    this.setListener('click', (e) => this.changeMsgWindow(e));
  }

  changeMsgWindow(e: Event) {
    const element = e.target;
    if (element instanceof HTMLElement && element.classList.contains('users-item')) {
      const login = element.textContent || '';
      const isOnline = element.parentElement?.className === 'active-users';
      const newWindow = new MessageWindow(login, isOnline);
      this.#msgWindow.getNode().replaceWith(newWindow.getNode());
      this.#msgWindow = newWindow;
    }
  }
}

export default Main;
