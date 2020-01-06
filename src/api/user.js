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

/**
 * 获取用户关注列表
 * @param {Number} uid, 必选, 用户的id
 * @param {Number} limit: 取出评论数量 , 默认为 30
 * @param {Number} offset: 偏移数量 , 用于分页
 */
export const getUserFollows = (options) => {
  const { uid, limit = 30, offset } = options;
  const params = {
    uid,
    limit,
    offset
  };
  return request({
    url: '/user/follows',
    params
  });
};

/**
 * 获取用户粉丝列表
 * @param {Number} uid, 必选, 用户的id
 * @param {Number} limit: 取出评论数量 , 默认为 30
 * @param {Number} offset: 偏移数量 , 用于分页
 */
export const getUserFans = (options) => {
  const { uid, limit = 30, lasttime = - 1 } = options;
  const params = {
    uid,
    limit,
    lasttime
  };
  return request({
    url: '/user/followeds',
    params
  });
};
