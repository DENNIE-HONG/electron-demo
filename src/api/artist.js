/**
 * @file 歌手的接口请求
 * @author luyanhong 2019-08-15
 */


import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};

// 获取歌手描述
export const getArtistDesc = (id = required()) => request(`/artist/desc?id=${id}`);
export const a = 1;
