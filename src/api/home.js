import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};
export const getPersonalized = () => request.get('/personalized');
// export const getMusic = (id = required()) => request.get(`/music/url?id=${id}`);
export const getMusic = (id = required()) => request.get(`/song/url?id=${id}`);
export const getPlaylistDetail = (id = required()) => request.get(`/playlist/detail?id=${id}`);
// 新碟上架
export const getPersonalizedNew = (limit = 50) => request.get(`/top/album?limit=${limit}`);

// 获取专辑内容
export const getAlbum = (id = required()) => request.get(`/album?id=${id}`);

