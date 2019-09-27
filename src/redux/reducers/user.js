import defaultAvatar from 'assets/img/user.jpg';
import { LOGIN_TODO, LOGOUT_TODO } from '../actionTypes';
const defaultState = {
  nickName: 'electron宝宝',
  avatar: defaultAvatar
};
const loginReducer = (state = defaultState, action) => {
  if (action.type === LOGIN_TODO) {
    const { nickName, avatar } = action.payload;
    return Object.assign({}, state, {
      nickName,
      avatar
    });
  }
  if (action.type === LOGOUT_TODO) {
    return defaultState;
  }
  return state;
};
export default loginReducer;
