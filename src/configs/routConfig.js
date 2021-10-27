import Home from 'components/home/Home';
import Login from 'components/login/Login';
import Signup from 'components/login/Signup';

/**
 * 라우팅 페이지 관리
 */
export const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: ['/login'],
    exact: true,
    component: Login,
  },
  {
    path: '/signup',
    exact: true,
    component: Signup,
  },
];
