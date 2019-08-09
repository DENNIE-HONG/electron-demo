/**
 * @file 专辑的接口请求
 * @author luyanhong 2019-08-09
 */

import { prettyDuration } from 'utils/pretty-time';
import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};
/**
 * 专辑评论
 * @param {Number} id, 必选参数 : id: 电台节目的 id
 * @param {Number} limit: 取出评论数量 , 默认为 20
 * @param {Number} offset: 偏移数量 , 用于分页
 */
export const getSongComment = (options) => {
  const { id, limit = 20, offset } = options;
  const params = {
    id,
    limit,
    offset
  };
  return request({
    url: '/comment/music',
    params
  });
};

// 获取专辑内容
export const getAlbum = async (id = required()) => {
  const res = await request.get(`/album?id=${id}`);
  const { songs } = res;
  songs.map((song) => {
    song.artist = song.ar[0].name;
    const duration = parseInt(song.m.size * 8 / song.m.br, 10) * 1000;
    song.durationPretty = prettyDuration(duration);
  });
  return res;
};

/**
 * 专辑评论
 * @param {Number} id, 必选参数 : id: 电台节目的 id
 * @param {Number} limit: 取出评论数量 , 默认为 20
 * @param {Number} offset: 偏移数量 , 用于分页
 */
export const getAlbumComment = (options) => {
  const { id, limit = 20, offset } = options;
  const params = {
    id,
    limit,
    offset
  };
  return request({
    url: '/comment/album',
    params
  });
};
