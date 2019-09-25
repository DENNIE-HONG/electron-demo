/**
 * @file 处理play动作
 * @author luyanhong 2019-09-25
 */
import { PLAY_TODO } from '../actionTypes';
const defaultState = {
  playId: 0,
  playList: []
};
const playReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PLAY_TODO:
      const { playId, playList } = action.payload;
      return Object.assign({}, state, {
        playId,
        playList
      });
    default:
      return state;
  }
};
export default playReducer;
