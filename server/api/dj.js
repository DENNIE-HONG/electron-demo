import request from '../plugins/axios';

// 推荐电台
export const getProgramRecommend = () => request.get('/wy/program/recommend');

// 电台分类
export const getDjCatelist = () => request.get('/wy/dj/catelist');

// 电台列表, type是电台id
export const getDjRecommend = (type) => request.get(`/wy/dj/recommend/type?type=${type}`);

// 电台详情, rid是节目id
export const getDjDetail = (rid) => request.get(`/wy/dj/detail?rid=${rid}`);
