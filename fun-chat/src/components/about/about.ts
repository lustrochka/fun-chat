import Component from '../basic-components/component';
import Button from '../basic-components/button';
import { div, h3 } from '../basic-components/tags';
import Router from '../../router/router';

class About extends Component {
  constructor() {
    const description = div('about__description');
    description.changeText(
      `This application was made as part of the course of RSSchool. 
      It is a chat which uses websocket technology and where you can correspond with different users.`
    );

    const author = div('about__author');
    author.changeText('author: Lustrochka');

    super(
      'div',
      'about',
      h3('about__title', 'Fun chat'),
      description,
      author,
      new Button('about__button button', 'Return', {}, () => new Router().return())
    );
  }
}

export default About;
