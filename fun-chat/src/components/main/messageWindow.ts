import Component from '../basic-components/component';
import MessageInput from './messageInput';
import { div, span } from '../basic-components/tags';

class MessageWindow extends Component {
  constructor(login?: string, isOnline?: boolean) {
    super('div', 'msg-window');
    let statusText = '';
    let className = 'user-status';
    if (login) {
      statusText = `${isOnline ? 'Online' : 'Offline'}`;
      if (!isOnline) className = 'user-status red';
    }
    this.appendChildren(
      div('msg-window__title', span('username', `${login || ''}`), span(`${className}`, `${statusText}`)),
      div('msg-history'),
      new MessageInput(login === undefined, login || '')
    );
  }
}

export default MessageWindow;
