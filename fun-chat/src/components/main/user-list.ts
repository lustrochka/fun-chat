import Component from '../basic-components/component';
import { ul, li, span } from '../basic-components/tags';
import { UnreadMsgsType } from '../../types';

class UserList extends Component {
  constructor(data: UnreadMsgsType) {
    super('div', 'user-list');
    const active = ul(
      'active-users',
      ...Object.keys(data.active).map((el) =>
        li('users-item', span('name', el), span('count-messages', `${data.active[el] || ''}`))
      )
    );
    const inactive = ul(
      'inactive-users',
      ...Object.keys(data.inactive).map((el) =>
        li('users-item', span('name', el), span('count-messages', `${data.inactive[el] || ''}`))
      )
    );
    this.appendChildren(active, inactive);
  }
}

export default UserList;
