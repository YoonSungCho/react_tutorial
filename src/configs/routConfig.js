import Home from 'components/home/Home';
import Login from 'components/login/Login';
import SignUp from 'components/login/SignUp';

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
    component: SignUp,
  },
];
