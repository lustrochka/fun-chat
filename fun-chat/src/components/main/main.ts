import Component from '../basic-components/component';
import Header from './header';
import Filter from './filter';
import Footer from './footer';
import API from '../../api/api';

class Main extends Component {
  constructor() {
    super('div', 'main', new Header(), new Filter(), new Footer());
    new API().getOnlineUsers();
    new API().getOfflineUsers();
  }
}

export default Main;
