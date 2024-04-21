import Component from '../basic-components/component';
import Label from '../basic-components/label';
import Input from '../basic-components/input';
import Button from '../basic-components/button';
import Modal from './modal';
import API from '../../api/api';
import { span } from '../basic-components/tags';
import { PatternsType } from '../../types';
import Router from '../../router/router';

const PATTERNS: PatternsType = {
  login: [
    '[a-zA-Z0-9_\\-]{4,}',
    'You should use at least 4 characters, which can include letters, digits, underscore or dash',
  ],
  password: [
    '(?=.*[0-9])(?=.*[!@#$%^&*+])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*+]{4,}',
    'Password should contain at least 4 characters, including lowercase and uppercase letters, digits and special characters',
  ],
};

class LoginPage extends Component<HTMLFormElement> {
  #nameInput;

  #passInput;

  #nameMsg;

  #passMsg;

  #submitButton;

  constructor() {
    super('form', 'login-form');
    this.#nameMsg = span('login-form__message', '');
    this.#passMsg = span('login-form__message', '');
    this.#submitButton = new Button('login-form__button button', 'Login', { type: 'button', disabled: 'true' });
    this.#nameInput = new Input(
      'login-form__input',
      {
        id: 'name',
        type: 'text',
        name: 'login',
        required: 'true',
        pattern: `${PATTERNS.login[0]}`,
        placeholder: 'Username',
      },
      () => {
        this.#nameMsg.changeText(this.checkValidity(this.#nameInput.getValue(), 'login'));
        if (this.checkFormValidity()) {
          this.#submitButton.deleteAttribute('disabled');
        } else this.#submitButton.addAttributes({ disabled: 'true' });
      }
    );
    this.#passInput = new Input(
      'login-form__input',
      {
        id: 'password',
        type: 'password',
        name: 'login',
        required: 'true',
        pattern: `${PATTERNS.password[0]}`,
        placeholder: '1Ab+',
      },
      () => {
        this.#passMsg.changeText(this.checkValidity(this.#passInput.getValue(), 'password'));
        if (this.checkFormValidity()) {
          this.#submitButton.deleteAttribute('disabled');
        } else this.#submitButton.addAttributes({ disabled: 'true' });
      }
    );
    this.render();
  }

  render() {
    this.#submitButton.setListener('click', () => this.sendLogin());
    this.appendChildren(
      new Label('login-form__label', 'Name', { for: 'name' }),
      this.#nameInput,
      this.#nameMsg,
      new Label('login-form__label', 'Password', { for: 'password' }),
      this.#passInput,
      this.#passMsg,
      this.#submitButton,
      new Button('login__about-button button', 'About', { type: 'button' }, () => new Router().changeUrl('/about')),
      new Modal()
    );
    this.setListener('submit', (e: Event) => {
      if (this.checkFormValidity()) this.sendLogin();
      e.preventDefault();
    });
  }

  sendLogin() {
    sessionStorage.setItem('login', this.#nameInput.getValue());
    sessionStorage.setItem('pass', this.#passInput.getValue());
    new API().sendLogin(this.#nameInput.getValue(), this.#passInput.getValue());
  }

  checkValidity(value: string, type: string) {
    const regex = new RegExp(PATTERNS[type][0]);
    if (!regex.test(value)) return PATTERNS[type][1];
    return '';
  }

  checkFormValidity() {
    return this.getNode().checkValidity();
  }
}

export default LoginPage;
