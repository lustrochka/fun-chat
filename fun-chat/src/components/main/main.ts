import Component from '../basic-components/component';
import Header from './header';
import Footer from './footer';
import { p } from '../basic-components/tags';

class Main extends Component {
  constructor() {
    super('div', 'main', new Header(), p('', 'main'), new Footer());
  }
}

export default Main;
