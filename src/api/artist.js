/**
 * @file 歌手的接口请求
 * @author luyanhong 2019-08-15
 */

import { prettyDuration } from 'utils/pretty-time';
import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};

// 获取歌手描述
export const getArtistDesc = (id = required()) => request(`/artist/desc?id=${id}`);
// 获取歌手单曲
export const getArtistSongs = async (id = required()) => {
  const res = await request(`/artists?id=${id}`);
  res.hotSongs.map((song) => {
    song.album = song.al.name;
    const duration = song.m ? parseInt(song.m.size * 8 / song.m.br, 10) * 1000 : 0;
    song.durationPretty = prettyDuration(duration);
  });
  return res;
};


/**
 * 获取歌手专辑
 * @param {Number} id, 必选参数 : id: 歌手id
 * @param {Number} limit: 取出专辑数量 , 默认为50
 * @param {Number} offset: 偏移数量 , 用于分页
 */
export const getArtistAlbum = (options) => {
  const { id, limit = 50, offset } = options;
  const params = {
    id,
    limit,
    offset
  };
  return request({
    url: '/artist/album',
    params
  });
};
