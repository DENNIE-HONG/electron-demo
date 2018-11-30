// 排行榜接口
import request from '../plugins/axios';
const required = () => {
  throw Error('Missing parameter!');
};
// 所有榜单
export const getTopList = () => request.get('/wy/toplist')
