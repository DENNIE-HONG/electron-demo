import request from '../plugins/axios';

// 推荐电台
export const getProgramRecommend = () => request.get('/wy/program/recommend');

// 电台分类
export const getDjCatelist = () => request.get('/wy/dj/catelist');
