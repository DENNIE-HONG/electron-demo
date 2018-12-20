// 排行榜接口
import request from '../plugins/axios';
import { getPlaylistDetail } from './home';
// 所有榜单
export const getTopList = () => request.get('/wy/toplist');

// 获取榜单
export const getTopRecommend = () => new Promise(async (resolve, reject) => {
  try {
    const res = await getTopList();
    if (res.code === 200) {
      const results = res.list.slice(0, 3);
      const i = 1;
      const [...topList] = results;
      const [...tracks] = await Promise.all([
        getPlaylistDetail(topList[i].id),
        getPlaylistDetail(topList[i].id),
        getPlaylistDetail(topList[i].id)
      ]);
      for (let j = 0; j < topList.length; j += 1) {
        topList[j].tracks = tracks[j].playlist.tracks.slice(0, 10);
      }
      resolve({
        code: 200,
        list: results
      });
    }
  } catch (err) {
    reject(err);
  }
});

// 榜单内容摘要
export const getTopListDetail = () => request.get('/wy/toplist/detail');
