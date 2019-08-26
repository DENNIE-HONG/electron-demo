/**
 * @file 主页脚本
 * @author luyanhong
 */
import React from 'react';
import { render } from 'react-dom';
import RouteMap from './routes';
import '@babel/polyfill';
import 'assets/main.scss';
import catchError from './plugins/error';
catchError();
const root = document.createElement('div');
root.className = 'page';
document.body.appendChild(root);

render(
  <>
    <RouteMap />
  </>,
  root
);
