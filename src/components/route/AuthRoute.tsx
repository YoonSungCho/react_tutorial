import { AuthContext } from 'contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';

/**
 * AuthRoute
 * Route 상속받고 render 전 로그인 여부를 검사한 후 route 동작 진행
 */
export default class AuthRoute extends Route {
  static contextType = AuthContext;

  render() {
    let user = this.context;
    return user.authenticated ? (
      super.render()
    ) : this.props.path === '/login' ? (
      super.render()
    ) : (
      <Redirect to="/login" />
    );
  }
}
