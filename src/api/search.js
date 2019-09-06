/**
 * @file 搜索接口
 * @author hongluyan 2019-09-02
 */
import { prettyDuration } from 'utils/pretty-time';
import request from '../plugins/axios';
/**
 * 搜索
 * @param {Number} keywords, 必选参数 : keywords
 * @param {Number} limit: 取出评论数量 , 默认为 30
 * @param {Number} offset: 偏移数量 , 用于分页
 * @param {String} type, 搜索类型，默认'song'
 */
// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
const typeObj = {
  'song': 1,
  'album': 10,
  'artist': 100,
  'playlist': 1000,
  'mv': 1004,
  'djRadio': 1009
};
export const getSearchSuggest = (keywords) => request.get(`/search/suggest?keywords=${keywords}`);
export const getSearch = async (options) => {
  try {
    const { keywords, limit = 30, offset } = options;
    const { type = 'song' } = options;
    const paramType = typeObj[type];
    const params = {
      keywords,
      limit,
      offset,
      type: paramType
    };
    const res = await request({
      url: '/search',
      params
    });
    if (res.code !== 200) {
      throw new Error('error');
    }
    res.list = res.result[`${type}s`];
    res.total = res.result[`${type}Count`];
    res.list.map((song) => {
      song.album && (song.album = song.album.name);
      song.artists && (song.artist = song.artists[0].name);
      song.duration && (song.durationPretty = prettyDuration(song.duration));
    });
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
};
