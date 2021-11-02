import React, { useContext, useEffect } from 'react';
import HomeBar from './HomeBar';
import { ToastContainer, toast } from 'react-toastify';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { AuthContext } from 'contexts/AuthContext';

type LocationState = {
  from: string;
};

/**
 * 홈 화면 컴퍼넌트
 * @returns
 */
export default function Home(props: RouteComponentProps<{}, StaticContext, LocationState>) {
  let user = useContext(AuthContext);
  // login 페이지도 이동한 경우 welcome 메세지 띄움
  // useEffect 가 뭔지는 모르나 redering 다 끝난 후 동작하는거 같음
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
