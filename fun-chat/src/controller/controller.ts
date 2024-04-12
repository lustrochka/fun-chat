import { getDomElement } from '../utils/getDomElement';
import { Items } from '../types';

const ERRORS: Items = {
  'incorrect password': 'Incorrect password',
  'a user with this login is already authorized': 'This user is already authorized',
};

class Controller {
  #data;
  constructor(data: string) {
    console.log(data);
    this.#data = JSON.parse(data);
    if (this.#data.type === 'ERROR') this.manageLogin();
  }
  manageLogin() {
    getDomElement('.modal').hidden = false;
    getDomElement('.error-message__text').textContent = `${ERRORS[this.#data.payload.error]}`;
  }
}

export default Controller;
