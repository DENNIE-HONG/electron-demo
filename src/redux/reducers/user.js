import defaultAvatar from 'assets/img/user.jpg';
import { LOGIN_TODO, LOGOUT_TODO } from '../actionTypes';
const defaultState = {
  userInfo: {
    avatarUrl: defaultAvatar,
    nickname: 'electron宝宝'
  },
  isLogin: false
};
const loginReducer = (state = defaultState, action) => {
  if (action.type === LOGIN_TODO) {
    const { userInfo } = action.payload;
    return Object.assign({}, state, {
      userInfo,
      isLogin: true
    });
  }
  if (action.type === LOGOUT_TODO) {
    return defaultState;
  }
  return state;
};
export default loginReducer;
