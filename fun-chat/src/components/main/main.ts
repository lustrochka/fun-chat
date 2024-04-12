import Component from '../basic-components/component';
import Header from './header';
import { p } from '../basic-components/tags';

class Main extends Component {
  constructor() {
    super('div', 'main', new Header(), p('', 'main'));
  }
}

export default Main;
