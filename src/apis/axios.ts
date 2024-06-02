import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
}); // base URL을 인터 페이스로 지정합니다. 추후 변경됩니다.

// client.interceptors.request.use(async config => {
//   const token = localStorage.getItem('token');

//   if (config.headers && token && token !== 'undefined') {
//     config.headers.Authorization = token;
//   }

//   return config;
// });

export default client;
