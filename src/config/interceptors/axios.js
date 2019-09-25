/**
 * 响应请求拦截
 * @author luyanhong
 */
export const requestSuccessFunc = (config) => config;
export const requestFailFunc = (err) => Promise.reject(err);
export const responseSuccessFunc = (response) => {
  const { data } = response;
  if (data.code === 200) {
    return response.data;
  }
  return Promise.reject(data);
};
export const responseFailFunc = (err) => Promise.reject(err);
