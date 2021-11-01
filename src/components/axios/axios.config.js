import axios from 'axios';

axios.defaults.baseURL = 'https://jsbackend.herokuapp.com';

// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    return Promise.reject(error);
  },
);
