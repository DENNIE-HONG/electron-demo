import defaultAvatar from 'assets/img/user.jpg';
import { LOGIN_TODO } from '../actionTypes';
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
  return state;
};
export default loginReducer;
