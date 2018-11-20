/**
 * 响应请求拦截
 * @author luyanhong
 */
export const requestSuccessFunc = (config) => {
  return config;
};
export const requestFailFunc = (err) => {
  return Promise.reject(err);
};
export const responseSuccessFunc = (response) => {
  return response.data;
};
export const responseFailFunc = (err) => {
  return Promise.reject(err);
};
