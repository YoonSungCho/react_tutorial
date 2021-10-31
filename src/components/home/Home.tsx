import React, { useContext, useEffect } from 'react';
import HomeBar from './HomeBar';
import { Location } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { AuthContext } from 'contexts/AuthContext';

type LocationState = {
  from: string;
};

/**
 *
 * @returns
 */
export default function Home(props: RouteComponentProps<{}, StaticContext, LocationState>) {
  let user = useContext(AuthContext);
  useEffect(() => {
    if (props.location.state.from === '/login') {
      toast('Hello, ' + user.userName);
    }
  });

  return (
    <>
      <HomeBar />
      <ToastContainer />
    </>
  );
}
