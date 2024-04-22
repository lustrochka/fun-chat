import Component from '../basic-components/component';
import { MessageType } from '../../types';
import MessageItem from './MessageItem';
import API from '../../api/api';
import { getDomElement, getDomElements } from '../../utils/getDomElement';

class MessageHistory extends Component {
  constructor(data: MessageType[]) {
    super('div', 'msg-history');
    let isLineAdded = false;
    const addLine = () => {
      isLineAdded = true;
    };
    data.forEach((el) => {
      // console.log(line.getNode().getBoundingClientRect().top, this.getNode().getBoundingClientRect().top);
      this.appendChildren(new MessageItem(el, isLineAdded, addLine));
    });
    this.setListener('click', () => this.changeStatus());
    getDomElement('.send-button').addEventListener('click', () => this.changeStatus());
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
