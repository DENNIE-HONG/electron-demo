/**
 * @file 用户信息接口
 * @author luyanhong 2019-10-10
 */
import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};

// 获取用户详情
export const getUserDetail = (uid = required()) => request.get(`/user/detail?uid=${uid}`);

export const getUserSubCount = () => request.get('/user/subcount');

export const getUserPlaylist = (uid = required()) => request.get(`/user/playlist?uid=${uid}`);

// 获取喜欢音乐列表
export const getLikeList = (uid = required()) => request.get(`/likelist?uid=${uid}`);
