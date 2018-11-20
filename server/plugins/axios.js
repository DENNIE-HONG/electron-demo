/**
 * 请求实例插件，并注入配置
*/
import axios from 'axios';
import { requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc } from '../../config/interceptors/axios';
const config = require('../../config');
const { AXIOS_DEFAULT_CONFIG } = config;

const request = axios.create(AXIOS_DEFAULT_CONFIG);
request.interceptors.request.use(requestSuccessFunc, requestFailFunc);
request.interceptors.response.use(responseSuccessFunc, responseFailFunc);
export default request;
