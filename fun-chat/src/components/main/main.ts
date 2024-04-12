import Component from '../basic-components/component';
import { p } from '../basic-components/tags';

class Main extends Component {
  constructor() {
    super('div', 'main', p('', 'main'));
  }
}

export default Main;
