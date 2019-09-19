/**
 * @file 登录接口
 * @author luyanhong 2019-09-19
 */
import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};
// 手机登录
export const loginPhone = (phone = required(), password = required()) => request.get(`/login/cellphone?phone=${phone}&password=${password}`);

// 邮箱登录
export const loginMail = (email = required(), password = required()) => request.get(`/login?email=${email}@163.com&password=${password}`);
