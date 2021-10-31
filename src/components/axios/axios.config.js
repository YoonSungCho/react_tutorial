import axios from 'axios';

axios.defaults.baseURL = 'https://jsbackend.herokuapp.com';

// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    // 인증 계열 서비스 호출 시
    if (config.url.includes('/auth')) {
      // 헤더 추가
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      // parameter encoding 변경
      config.data = new URLSearchParams(config.data);
    }
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
  function (response) {
    // jwt default header 에 추가 및 갱신
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.jwt;
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
