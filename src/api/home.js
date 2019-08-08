import { prettyDuration } from 'utils/pretty-time';
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
export const getAlbum = async (id = required()) => {
  const res = await request.get(`/album?id=${id}`);
  const { songs } = res;
  songs.map((song) => {
    song.artist = song.ar[0].name;
    const duration = parseInt(song.l.size * 8 / song.l.br, 10) * 1000;
    console.log(prettyDuration(duration));
    song.durationPretty = prettyDuration(duration);
  });
  return res;
};

