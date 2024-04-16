import Component from '../basic-components/component';
import Header from './header';
import Footer from './footer';
import API from '../../api/api';

class Main extends Component {
  constructor() {
    super('div', 'main', new Header(), new Footer());
    new API().getOnlineUsers();
    new API().getOfflineUsers();
  }
}

export default Main;
