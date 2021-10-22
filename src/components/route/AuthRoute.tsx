import React, { useContext, ReactChild, ReactChildren } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import { Route, Redirect } from 'react-router-dom'

type prop = {
  children: ReactChild | ReactChildren
  path: string
}

export default function AuthRoute({ children, ...rest }: prop) {
  const user = useContext(AuthContext)
  return (
    <Route {...rest} render={() => (user.authenticated ? children : <Redirect to="/login" />)} />
  )
}
