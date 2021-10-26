import './App.css';
import { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ErrorBoundary from 'components/error/ErrorBoundary';
import AuthRoute from 'components/route/AuthRoute';
import { routes } from 'configs/routConfig';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            {/* 현재 URL과 매칭되는 <route> 찾아 component 실행 */}
            <Switch>
              {routes.map((route, i) => {
                return (
                  <AuthRoute
                    key={i}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;

{
  /* <Route path="/login" exact component={Login} />
<AuthRoute path="/">
  <Home />
</AuthRoute>  */
}
