import { getDomElement } from '../utils/getDomElement';
import { Items, ResponseType } from '../types';

const ERRORS: Items = {
  'incorrect password': 'Incorrect password',
  'a user with this login is already authorized': 'This user is already authorized',
};

class Controller {
  checkData(data: string) {
    console.log(data);
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    if (parsedData.type === 'ERROR') this.manageLogin(parsedData);
  }

  manageLogin(data: ResponseType) {
    getDomElement('.modal').hidden = false;
    getDomElement('.error-message__text').textContent = `${ERRORS[data.payload.error]}`;
  }
}

export default Controller;
