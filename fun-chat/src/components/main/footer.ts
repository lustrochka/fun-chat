import Component from '../basic-components/component';
import { div, span, a } from '../basic-components/tags';

class Footer extends Component {
  constructor() {
    super(
      'footer',
      'footer',
      div('footer__school', div('footer__logo'), span('footer__school-name', 'RSSchool')),
      div('footer__author', span('', 'Lustrochka'), a('', 'GitHub', 'https://github.com/lustrochka'), span('', '2024'))
    );
  }
}

export default Footer;
