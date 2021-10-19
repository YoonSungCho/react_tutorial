import './App.css'
import Login from './components/login/Login'
import Home from './components/home/Home'
import { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ErrorBoundary from 'components/error/ErrorBoundary'
import AuthRoute from 'components/route/AuthRoute'
import { AuthContext } from 'contexts/AuthContext'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            {/* 현재 URL과 매칭되는 <route> 찾아 component 실행 */}
            <Switch>
              {/* Login 된 사용자인지 확인 후 rout */}
              <Route path="/login" exact component={Login} />
              <AuthRoute path="/">
                <Home />
              </AuthRoute>
            </Switch>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </div>
  )
}

export default App
