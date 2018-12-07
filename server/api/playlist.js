// 歌单接口
import request from '../plugins/axios';
/**
 * 歌单
 * @param {String}, order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为'hot'
 * @param {String}, cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 "
 * @param {Number}, limit
 * @param {Number}, offset,
*/
export const getTopPlayList = ({ order, cat, limit, offset }) => {
  const params = {
    order: order || 'hot',
    cat: cat || '全部',
    limit: limit || 20,
    offset: offset || 0
  };
  return request({
    url: '/wy/top/playlist',
    params
  });
}
