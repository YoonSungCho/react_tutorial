import axios from 'axios';

export interface SignInParams {
  identifier: string;
  password: string;
}
export const SignIn = (params: SignInParams) => {
  const formData = new FormData();
  formData.append('identifier', params.identifier);
  formData.append('password', params.password);

  return axios.post('/auth/local', formData, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
};
