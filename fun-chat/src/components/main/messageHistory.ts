import Component from '../basic-components/component';
import { MessageType } from '../../types';
import MessageItem from './MessageItem';
import API from '../../api/api';
import { span } from '../basic-components/tags';
import { getDomElement, getDomElements } from '../../utils/getDomElement';

class MessageHistory extends Component {
  constructor(data: MessageType[]) {
    super('div', 'msg-history');
    let isLineAdded = false;
    const addLine = () => {
      isLineAdded = true;
    };
    data.forEach((el) => {
      this.appendChildren(new MessageItem(el, isLineAdded, addLine));
    });
    this.setListener('click', () => this.changeStatus());
    getDomElement('.send-button').addEventListener('click', () => this.changeStatus());
    if (data.length === 0) this.appendChildren(span('msg-history__placeholder', 'Write your first message'));
  }

  changeStatus() {
    const elements = getDomElements('.msg-item.left');
    elements.forEach((x) => {
      if (x.dataset.status !== 'Readed') new API().changeReadStatus(x.id.slice(1));
    });
    try {
      getDomElement('.active').children[1].textContent = '';
    } catch {}
  }
}

export default MessageHistory;
