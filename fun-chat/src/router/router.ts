import LoginPage from '../components/login-page/login-page';
import Main from '../components/main/main';

const ROUTES: { [key: string]: Node } = {
  '/login': new LoginPage().getNode(),
  '/main': new Main().getNode(),
};

class Router {
  changeUrl(url: string) {
    window.history.pushState({}, '', url);
    this.changePage();
  }

  changePage() {
    const path = window.location.pathname;
    document.body.innerHTML = '';
    document.body.appendChild(ROUTES[path]);
  }
}

export default Router;
