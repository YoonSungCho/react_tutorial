import React from 'react';

// 사용자 계정 및 접속 정보
type User = {
  userId: number | string;
  userName: string | undefined;
  email: string | undefined;
  authenticated: boolean;
  imageUrl: string | undefined;
};

const AuthContext = React.createContext<User>({
  userId: 0,
  userName: undefined,
  email: undefined,
  authenticated: false,
  imageUrl: undefined,
});

export { AuthContext };
