import request from '../plugins/axios';
// 获取歌曲详情
export const getSongDetail = (ids) => request.get(`/song/detail?ids=${ids}`);

// 获取歌词
export const getLyric = (id) => request.get(`/lyric?id=${id}`);

