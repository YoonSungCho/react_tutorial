import React from 'react';

// 사용자 계정 및 접속 정보
type User = {
  userId?: number;
  userName?: string;
  email?: string;
  authenticated?: boolean;
  imageUrl?: string;
  jwt?: string;
};

const AuthContext = React.createContext<User>({});

export { AuthContext };
