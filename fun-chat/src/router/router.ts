import LoginPage from '../components/login-page/login-page';
import Main from '../components/main/main';
import About from '../components/about/about';

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
      case '/about':
        document.body.appendChild(new About().getNode());
        break;
      default:
        console.log('404');
    }
  }

  return() {
    window.history.back();
  }
}

export default Router;
