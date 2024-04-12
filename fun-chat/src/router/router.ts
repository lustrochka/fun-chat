import LoginPage from '../components/login-page/login-page';
import Main from '../components/main/main';

class Router {
  changeUrl(url: string) {
    window.history.pushState({}, '', url);
    this.changePage();
  }

  changePage() {
    const ROUTES: { [key: string]: Node } = {
      '/login': new LoginPage().getNode(),
      '/main': new Main().getNode(),
    };
    const path = window.location.pathname;
    document.body.innerHTML = '';
    document.body.appendChild(ROUTES[path]);
  }
}

export default Router;
