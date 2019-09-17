import PLAY_TODO from './actionTypes';
const defaultState = {
  playId: 0,
  playList: []
};
export default (state = defaultState, action) => {
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
