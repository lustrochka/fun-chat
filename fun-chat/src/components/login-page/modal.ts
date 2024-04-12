import Component from '../basic-components/component';
import Button from '../basic-components/button';
import { div } from '../basic-components/tags';

class Modal extends Component {
  constructor() {
    super('div', 'modal');
    this.appendChildren(
      div('error-message', div('error-message__text'), new Button('.button', 'OK', {}, () => this.hide()))
    );
    this.hide();
  }
}

export default Modal;
