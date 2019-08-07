/**
 * 请求实例插件，并注入配置
*/
import axios from 'axios';
import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc
} from '../../config/interceptors/axios';
import AXIOS_DEFAULT_CONFIG from '../../config/axios';
// const { AXIOS_DEFAULT_CONFIG } = config;
console.log(AXIOS_DEFAULT_CONFIG);
const request = axios.create(AXIOS_DEFAULT_CONFIG);
request.interceptors.request.use(requestSuccessFunc, requestFailFunc);
request.interceptors.response.use(responseSuccessFunc, responseFailFunc);
export default request;
