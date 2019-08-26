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
  console.log('出错');
  return Promise.reject('资源获取失败了');
};
export const responseFailFunc = (err) => Promise.reject(err);
