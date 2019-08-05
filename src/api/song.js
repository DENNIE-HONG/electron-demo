import request from '../plugins/axios';
// 获取歌曲详情
export const getSongDetail = (ids) => request.get(`/song/detail?ids=${ids}`);
export const a = 1;
