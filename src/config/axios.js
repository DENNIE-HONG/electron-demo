/**
 * @file axios默认配置, 注意运行环境是浏览器
 * @author luyanhong
 */
const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 20000,
  baseURL: `http://${process.env.IP_ADRESS}:3000`,
  headers: {
    Accept: 'application/json'
  },
  withCredentials: true
};
export default AXIOS_DEFAULT_CONFIG;
