// 排行榜接口
import request from '../plugins/axios';
import { getPlaylistDetail } from './home';
const required = () => {
  throw Error('Missing parameter!');
};
// 所有榜单
export const getTopList = () => request.get('/wy/toplist')

// 获取榜单
export const getTopRecommend = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await getTopList();
      if (res.code === 200) {
        const results = res.list.slice(0, 3);
        let i = 0;
        const [...topList] = results;
        const [...tracks] = await Promise.all([
          getPlaylistDetail(topList[i++].id),
          getPlaylistDetail(topList[i++].id),
          getPlaylistDetail(topList[i++].id)
        ]);
        for (let j = 0; j < topList.length; j++) {
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
}
