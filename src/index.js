/**
 * @file 主页脚本
 * @author luyanhong
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import RouteMap from './routes';
import '@babel/polyfill';
import 'assets/main.scss';
import catchError from './plugins/error';
import store from './redux/store';
import playAction from './redux/actions';

catchError();
const root = document.createElement('div');
root.className = 'page';
document.body.appendChild(root);

const mapStateToProps = (state) => {
  const { playId, playList } = state.playReducer;
  return {
    playId,
    playList
  };
};
// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => ({
  setMusic: (playList, playId) => {
    const payload = {
      playId,
      playList
    };
    dispatch(playAction(payload));
  }
});
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteMap);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
