import Component from '../basic-components/component';
import Button from '../basic-components/button';
import Router from '../../router/router';
import API from '../../api/api';
import { h1, span, div } from '../basic-components/tags';

class Header extends Component {
  constructor() {
    super(
      'header',
      'header',
      span('username', `Hello, ${sessionStorage.getItem('login') || ''}!`),
      h1('header__title', 'Fun chat'),
      div(
        'buttons',
        new Button('header__about-button', 'About', { type: 'button' }, () => new Router().changeUrl('/about')),
        new Button('logout-button', 'Log out', {}, () => new API().logOut())
      )
    );
  }
}

export default Header;
