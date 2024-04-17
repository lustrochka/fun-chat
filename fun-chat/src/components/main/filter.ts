import Component from '../basic-components/component';
import Input from '../basic-components/input';
import { getDomElements } from '../../utils/getDomElement';

class Filter extends Component {
  #input;

  constructor() {
    super('div', 'filter');
    this.#input = new Input('filter-input', { type: 'text' }, () => this.filterList());
    this.appendChildren(this.#input);
  }

  filterList() {
    const items = getDomElements('.users-item');
    items.forEach((item) => {
      item.hidden = item.textContent?.indexOf(this.#input.getValue()) === -1;
    });
  }
}

export default Filter;
