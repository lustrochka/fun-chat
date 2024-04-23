import Router from './router/router';
import Socket from './api/socket';
import './styles.css';

new Socket().setSocket();

window.addEventListener('unload', () => sessionStorage.removeItem('isOpened'));

window.addEventListener('popstate', () => {
  new Router().changePage();
});

/* window.addEventListener('DOMContentLoaded', () => {
  new Router().changePage();
}); */
