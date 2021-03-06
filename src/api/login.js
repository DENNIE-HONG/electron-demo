/**
 * @file 登录接口
 * @author luyanhong 2019-09-19
 */

import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};

const handleError = (err) => {
  const { message } = err;
  if (message.includes('501')) {
    return Promise.reject('账号不存在');
  }
  if (message.includes('502')) {
    return Promise.reject('密码错误');
  }
  if (message.includes('509')) {
    return Promise.reject('密码错误超过限制');
  }
  return Promise.reject('账号或密码不正确');
};
// 手机登录
export const loginPhone = async (phone = required(), password = required()) => {
  try {
    const res = await request.get(`/login/cellphone?phone=${phone}&password=${password}`);
    return res;
  } catch (err) {
    return handleError(err);
  }
};

// 邮箱登录
export const loginMail = async (email = required(), password = required()) => {
  try {
    const res = await request.get(`/login?email=${email}&password=${password}`);
    return res;
  } catch (err) {
    return handleError(err);
  }
};

// 获取用户详情
export const getUserDetail = (uid) => request.get(`/user/detail?uid=${uid}`);

// 登录状态
export const getLoginStatus = async () => {
  try {
    const resLogin = await request.get('/login/status');
    const res = await getUserDetail(resLogin.profile.userId);
    return res;
  } catch (err) {
    return Promise.reject({
      code: 301,
      msg: '没登录'
    });
  }
};

// 退出登录
export const logout = () => {
  request.get('/logout');
};
