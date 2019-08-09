/**
 * @file 电台节目接口
 * @author luyanhong 2019-08-09
 */
import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};
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

// 电台节目详情
export const getProgramDetail = (id = required()) => request.get(`/dj/program/detail?id=${id}`);
