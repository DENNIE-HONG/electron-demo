import request from '../plugins/axios';

/**
 * 电台节目评论
 * @param {Number} id, 必选参数 : id: 电台节目的 id
 * @param {Number} limit: 取出评论数量 , 默认为 20
 * @param {Number} offset: 偏移数量 , 用于分页
 */
export const getCommentDj = (options) => {
  const { id, limit = 20, offset } = options;
  const params = {
    id,
    limit,
    offset
  };
  return request({
    url: '/comment/dj',
    params
  });
};
export const getCommentPlaylist = 1;
