import { PLAY_TODO, LOGIN_TODO } from './actionTypes';

const playAction = (payload) => ({
  type: PLAY_TODO,
  payload
});
export default playAction;

export const loginAction = (payload) => ({
  type: LOGIN_TODO,
  payload
});
