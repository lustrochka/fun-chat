import Component from '../basic-components/component';
import { div, span } from '../basic-components/tags';
import { MessageType } from '../../types';
import API from '../../api/api';
import { getDomElement } from '../../utils/getDomElement';

class MessageItem extends Component {
  #msgText;

  constructor({ id, from, text, datetime, status }: MessageType, isLineAdded?: boolean, addLine?: () => void) {
    const isFromCurrent = sessionStorage.getItem('login') === from;

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
      )
    );

    this.#msgText = div('msg-text');
    this.#msgText.changeText(text);

    this.appendChildren(
      this.#msgText,
      div(
        'msg-status',
        span('edited-status', `${status.isEdited ? 'Edited' : ''}`),
        span('read-status', `${isFromCurrent ? msgStatusAttr : ''}`)
      )
    );

    this.addAttributes({ id: `m${id}`, 'data-status': `${msgStatusAttr}` });
    if (isFromCurrent) {
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

    editBtn.setListener('click', () => {
      this.editMessage(id);
      modal.destroy();
    });

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

  editMessage(id: string) {
    getDomElement<HTMLInputElement>('.input').value = this.#msgText.getNode().textContent || '';
    getDomElement('.send-button').removeAttribute('disabled');
    sessionStorage.setItem('editing-id', `${id}`);
  }
}

export default MessageItem;
