/**
 * @file 登录接口
 * @author luyanhong 2019-09-19
 */
import Cookies from 'js-cookie';
import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};
const COOKIE_NAME = 'user';
const saveCookie = (userId) => {
  Cookies.set(COOKIE_NAME, userId, { expires: 7 });
};
// 手机登录
export const loginPhone = async (phone = required(), password = required()) => {
  try {
    const res = await request.get(`/login/cellphone?phone=${phone}&password=${password}`);
    saveCookie(res.profile.userId);
    return res;
  } catch (err) {
    console.log(err);
    Promise.reject(err);
  }
};

// 邮箱登录
export const loginMail = (email = required(), password = required()) => request.get(`/login?email=${email}@163.com&password=${password}`);

// 获取用户详情
export const getUserDetail = (uid) => request.get(`/user/detail?uid=${uid}`);

// 登录状态
export const getLoginStatus = async () => {
  try {
    const userId = Cookies.get(COOKIE_NAME);
    if (!userId) {
      return Promise.reject({
        code: 301,
        msg: '没登录'
      });
    }
    const res = await getUserDetail(userId);
    return res;
  } catch (err) {
    console.log(err);
  }
};
