import LoginPage from '../components/login-page/login-page';
import Main from '../components/main/main';

const MIN_STORAGE_LEN = 1;

class Router {
  changeUrl(url: string) {
    window.history.pushState({}, '', url);
    this.changePage();
  }

  changePage() {
    const path = window.location.pathname;
    document.body.innerHTML = '';
    switch (path) {
      case '/login':
        if (sessionStorage.length === MIN_STORAGE_LEN) document.body.appendChild(new LoginPage().getNode());
        else {
          this.changeUrl('/main');
        }
        break;
      case '/main':
        if (sessionStorage.length > MIN_STORAGE_LEN) document.body.appendChild(new Main().getNode());
        else {
          this.changeUrl('/login');
        }
        break;
      default:
        console.log('404');
    }
  }
}

export default Router;
