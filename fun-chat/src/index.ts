import Router from './router/router';
import './styles.css';

new Router().changeUrl('/login');

window.addEventListener('popstate', () => {
  new Router().changePage();
});

/* window.addEventListener('DOMContentLoaded', () => {
  new Router().changePage();
}); */
