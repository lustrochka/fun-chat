import Component from '../basic-components/component';
import { div, span } from '../basic-components/tags';
import { MessageType } from '../../types';

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
    if (isFromCurrent) msgStatus.changeText(`${msgStatusAttr}`);
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
  }
}

export default MessageItem;
