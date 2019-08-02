// 歌单接口
import request from '../plugins/axios';
/**
 * 歌单
 * @param {String}, order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为'hot'
 * @param {String}, cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 "
 * @param {Number}, limit
 * @param {Number}, offset,
*/
export const getTopPlayList = ({
  order, cat, limit, offset
}) => {
  const params = {
    order: order || 'hot',
    cat: cat || '全部',
    limit: limit || 20,
    offset: offset || 0
  };
  return request({
    url: '/top/playlist',
    params
  });
};
// 歌单分类
export const getPlaylistCatList = () => new Promise(async (resolve, reject) => {
  try {
    const res = await request('/playlist/catlist');
    const result = [];

    if (res.code === 200) {
      Object.keys(res.categories).map((key) => {
        const type = res.categories[key];
        result[key] = {};
        result[key].type = type;
        result[key].subs = [];
      });
      for (let i = 0; i < res.sub.length; i += 1) {
        const item = res.sub[i];
        const { category } = item;
        result[category].subs.push(item);
      }
      resolve({
        code: 200,
        categories: result
      });
    } else {
      reject({
        code: 1,
        msg: '请求出错'
      });
    }
  } catch (err) {
    reject({
      code: err.code,
      msg: err
    });
  }
});

// 歌单详情接口
export const getPlaylistDetail = async (id) => {
  try {
    const res = await request(`/playlist/detail?id=${id}`);
    const { tracks } = res.playlist;
    tracks.map((item) => {
      item.singers = item.ar.map((singer) => singer.name);
      item.album = item.al.name;
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

