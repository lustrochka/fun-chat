import Component from '../basic-components/component';
import { div } from '../basic-components/tags';

class MessageWindow extends Component {
  #title;

  constructor() {
    super('div', 'msg-window');
    this.#title = div('msg-window__title');
    this.appendChildren(this.#title);
  }

  changeTitle(login: string, isActive: boolean) {
    console.log(login);
    this.#title.changeText(`${login} ${isActive ? 'Online' : 'Offline'}`);
  }
}

export default MessageWindow;
