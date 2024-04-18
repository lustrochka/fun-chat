import Component from '../basic-components/component';
import { div, span } from '../basic-components/tags';
import { MessageType } from '../../types';

class MessageItem extends Component {
  constructor({ from, text, datetime }: MessageType) {
    const isFromCurrent = sessionStorage.getItem('login') === from;
    const msgText = div('msg-text');
    msgText.changeText(text);
    super(
      'div',
      `${isFromCurrent ? 'msg-item left' : 'msg-item right'}`,
      div(
        'msg-title',
        span('', `${isFromCurrent ? 'You' : from}`),
        span('', `${new Date(datetime).toLocaleString('en-GB')}`)
      ),
      msgText
    );
  }
}

export default MessageItem;
