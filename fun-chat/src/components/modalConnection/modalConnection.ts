import Component from '../basic-components/component';
import { div } from '../basic-components/tags';

class ModalConnection extends Component {
  constructor() {
    const text = div('modal-connection__text');
    text.changeText('Connection closed. Trying to reconnect...');
    super('div', 'modal-connection', text);
  }
}

export default ModalConnection;
