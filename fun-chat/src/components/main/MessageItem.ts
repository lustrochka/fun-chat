import Component from '../basic-components/component';
import { div, span } from '../basic-components/tags';
import { MessageType } from '../../types';
import API from '../../api/api';

class MessageItem extends Component {
  constructor({ id, from, text, datetime, status }: MessageType, isLineAdded?: boolean, addLine?: () => void) {
    const isFromCurrent = sessionStorage.getItem('login') === from;

    const msgText = div('msg-text');
    msgText.changeText(text);

    const msgStatus = div('msg-status');
    let msgStatusAttr;
    if (status.isReaded) {
      msgStatusAttr = 'Readed';
    } else if (status.isDelivered) {
      msgStatusAttr = 'Delivered';
    } else {
      msgStatusAttr = 'Sent';
    }
    let classList = isFromCurrent ? 'msg-item right' : 'msg-item left';
    if (!isFromCurrent && msgStatusAttr !== 'Readed' && !document.querySelector('.new') && !isLineAdded) {
      classList += ' new';
      if (addLine) addLine();
    }

    super(
      'div',
      `${classList}`,
      div(
        'msg-title',
        span('', `${isFromCurrent ? 'You' : from}`),
        span('', `${new Date(datetime).toLocaleString('en-GB')}`)
      ),
      msgText,
      msgStatus
    );
    this.addAttributes({ id: `m${id}`, 'data-status': `${msgStatusAttr}` });
    if (isFromCurrent) {
      msgStatus.changeText(`${msgStatusAttr}`);
      this.setListener('contextmenu', (e) => {
        e.preventDefault();
        this.showModal(id);
      });
    }
  }

  showModal(id: string) {
    const editBtn = div('edit-button');
    editBtn.changeText('Edit');

    const deleteBtn = div('delete-button');
    deleteBtn.changeText('Delete');

    const modal = div('message-modal', editBtn, deleteBtn);

    deleteBtn.setListener('click', () => {
      new API().deleteMessage(id);
      modal.destroy();
    });
    document.addEventListener(
      'click',
      (e) => {
        if (e.target && e.target instanceof HTMLElement) {
          if (!e.target.closest('.message-modal')) modal.destroy();
        }
      },
      { once: true }
    );
    this.appendChildren(modal);
  }
}

export default MessageItem;
