import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};
export const getPersonalized = () => request.get('/wy/personalized');
export const getMusic = (id = required()) => request.get(`/wy/music/url?id=${id}`);
export const getPlaylistDetail = (id = required()) => request.get(`/wy/playlist/detail?id=${id}`);
// 新碟上架
export const getPersonalizedNew = (limit = 50) => request.get(`/wy/top/album?limit=${limit}`);

// 获取专辑内容
export const getAlbum = (id = required()) => request.get(`/wy/album?id=${id}`);

// 获取音乐详情
export const getSongDetail = (ids = required()) => request.get(`/wy/song/detail?ids=${ids}`);
