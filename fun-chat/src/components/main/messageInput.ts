import Component from '../basic-components/component';
import Button from '../basic-components/button';
import Input from '../basic-components/input';
import API from '../../api/api';

class MessageInput extends Component<HTMLFormElement> {
  #button;

  constructor(isDisabled: boolean, login: string) {
    super('form', 'msg-input');
    const text = new Input('input', {}, () => {
      text.getValue().length > 0
        ? this.#button.deleteAttribute('disabled')
        : this.#button.addAttributes({ disabled: 'true' });
    });
    if (isDisabled) text.addAttributes({ disabled: 'true' });

    this.#button = new Button('send-button', 'Send', { disabled: 'true' });
    this.appendChildren(text, this.#button);

    this.setListener('submit', (e) => {
      e.preventDefault();
      const id = sessionStorage.getItem('editing-id');

      if (id) {
        new API().editMessage(id, text.getValue());
        sessionStorage.removeItem('editing-id');
      } else if (text.getValue().length > 0) {
        new API().sendMessage(text.getValue(), login);
      }

      this.#button.addAttributes({ disabled: 'true' });
      this.getNode().reset();
    });
  }
}

export default MessageInput;
