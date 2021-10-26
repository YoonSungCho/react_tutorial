import Home from 'components/home/Home';
import Login from 'components/login/Login';

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
];
