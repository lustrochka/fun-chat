import Component from '../basic-components/component';
import { MessageType } from '../../types';
import MessageItem from './MessageItem';

class MessageHistory extends Component {
  constructor(data: MessageType[]) {
    super('div', 'msg-history');
    data.forEach((el) => this.appendChildren(new MessageItem(el)));
  }
}

export default MessageHistory;
