import { AuthContext } from 'contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';

/**
 * @class AuthRoute
 * T extends { path: string | string[] } 는 RouteProps 중 path 값만 활용하기 위해 선언
 *  이렇게 활용하는게 맞나 싶지만 구조 서브 타이핑에 의해 타입 호환이 된다.
 */
export default class AuthRoute<T extends { path: string | string[] }> extends Route<T> {
  static contextType = AuthContext;

  // 로그인 관련 페이지인 경우 권한 스킵
  readonly ignoreAuthPath = ['/login', '/signup'];

  /**
   * a array 에 b array 요소가 담겨있는지 확인하는 함수
   * @param haystack
   * @param arr
   * @returns
   */
  private findEvery = (a: string[], b: string[]): boolean => {
    return b.every(v => a.includes(v));
  };

  render() {
    let user = this.context;

    /**
     * TODO 브라우져 refresh할때 token 유지 불가하여 매번 로그인 해야함. (local or session storage 는 공격에 취약함)
     * httponly cookie 정책을 권장함 (https://youtu.be/894seNhONF8)
     * 개발자 도구에서 확인은 가능하지만 console 에서 document.cookie 로 접근 불가능
     */

    let path = (this.props as T).path;
    // string [] 로 통일
    let pathArray = Array.isArray(path) ? path : [path];
    // 유저 권한이 있거나 권한 스킵 페이지 인경우 통과
    // 아닌 경우 login 페이지로 리다이렉트
    return user.authenticated || this.findEvery(this.ignoreAuthPath, pathArray) ? (
      super.render()
    ) : (
      <Redirect to="/login" />
    );
  }
}
