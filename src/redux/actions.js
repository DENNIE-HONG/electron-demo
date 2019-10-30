import {
  PLAY_TODO, LOGIN_TODO, PLAY_START_TODO, PLAY_STOP_TODO
} from './actionTypes';

const playAction = (payload) => ({
  type: PLAY_TODO,
  payload
});
export default playAction;

export const loginAction = (payload) => ({
  type: LOGIN_TODO,
  payload
});

export const playStartAction = () => ({
  type: PLAY_START_TODO
});

export const playStopAction = () => ({
  type: PLAY_STOP_TODO
});
