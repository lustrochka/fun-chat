import Component from '../basic-components/component';
import { ul, li } from '../basic-components/tags';
import { UsersList } from '../../types';

class UserList extends Component {
  constructor(data: UsersList) {
    super('div', 'user-list');
    const active = ul('active-users', ...data.active.map((el) => li('users-item', el.login)));
    const inactive = ul('inactive-users', ...data.inactive.map((el) => li('users-item', el.login)));
    this.appendChildren(active, inactive);
  }
}

export default UserList;
