/**
 * @file 处理play动作
 * @author luyanhong 2019-09-25
 */
import { PLAY_TODO, PLAY_START_TODO, PLAY_STOP_TODO } from '../actionTypes';
const READY = 0;
const PLAYING = 1;
const PAUSE = 2;
const defaultState = {
  playId: 0,
  playList: [],
  playState: READY
};
const playReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PLAY_TODO:
      const { playId, playList } = action.payload;
      return Object.assign({}, state, {
        playId,
        playList
      });
    case PLAY_START_TODO:
      return Object.assign({}, state, {
        playState: PLAYING
      });
    case PLAY_STOP_TODO:
      return Object.assign({}, state, {
        playState: PAUSE
      });
    default:
      return state;
  }
};
export default playReducer;
