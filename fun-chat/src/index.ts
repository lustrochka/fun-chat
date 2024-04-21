import Router from './router/router';
import './styles.css';

new Router().changeUrl('/login');

window.addEventListener('popstate', () => {
  console.log('change');
  new Router().changePage();
});

/* window.addEventListener('DOMContentLoaded', () => {
  new Router().changePage();
}); */
