import request from '../plugins/axios';

// 推荐电台
export const getProgramRecommend = () => request.get('/program/recommend');

// 电台分类
export const getDjCatelist = () => request.get('/dj/catelist');

// 电台列表, type是电台id
export const getDjRecommend = (type) => request.get(`/dj/recommend/type?type=${type}`);

// 电台详情, rid是节目id
export const getDjDetail = (rid) => request.get(`/dj/detail?rid=${rid}`);

/**
 * 电台节目
 * @param {Number} 必选参数 : rid: 电台 的 id
 * @param {Number} limit : 返回数量 , 默认为 30
 * @param {Number} offset : 偏移数量，用于分页
*/
export const getDjProgram = ({ rid, offset, limit }) => {
  const params = {
    rid,
    offset,
    limit
  };
  return request({
    params,
    url: '/dj/program'
  });
};

// 电台节目详情
export const getProgramDetail = (id) => request.get(`/dj/program/detail?id=${id}`);
