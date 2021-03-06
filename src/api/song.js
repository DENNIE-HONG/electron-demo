/**
 * @file 歌曲请求接口
 * @author luyanhong 2019-08-09
 */
import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};
// 获取歌曲详情
export const getSongDetail = (ids) => request.get(`/song/detail?ids=${ids}`);

// 获取歌词
export const getLyric = (id = required()) => request.get(`/lyric?id=${id}`);

/**
 * 歌曲评论
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
