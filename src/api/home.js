/**
 * @file 推荐的接口请求
 * @author luyanhong
 */
import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};

export const getPersonalized = () => request.get('/personalized');
export const getMusic = (id = required()) => request.get(`/song/url?id=${id}`);
export const getPlaylistDetail = (id = required()) => request.get(`/playlist/detail?id=${id}`);
// 新碟上架
export const getPersonalizedNew = (limit = 50) => request.get(`/top/album?limit=${limit}`);
// 关注/取消关注用户
export const follow = (id, t) => request.get(`/follow?id=${id}&t=${t}`);

