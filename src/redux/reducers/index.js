/**
 * @file 应用状态变化响应actions
 * @author luyanhong 2019-09-25
 */
import { combineReducers } from 'redux';
import playReducer from './playMusic';
import loginReducer from './user';
export default combineReducers({
  playReducer,
  loginReducer
});
