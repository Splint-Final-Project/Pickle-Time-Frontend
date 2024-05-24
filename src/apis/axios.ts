import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:4001/api/',
}); // base URL을 인터 페이스로 지정합니다. 추후 변경됩니다.

export default instance;
