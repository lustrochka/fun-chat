import Component from '../basic-components/component';
import MessageInput from './messageInput';
import { div } from '../basic-components/tags';

class MessageWindow extends Component {
  #title;

  constructor(login?: string, isOnline?: boolean) {
    super('div', 'msg-window');
    this.#title = div('msg-window__title');
    if (login) this.#title.changeText(`${login} ${isOnline ? 'Online' : 'Offline'}`);
    this.appendChildren(this.#title, new MessageInput(login === undefined, login || ''));
  }
}

export default MessageWindow;
