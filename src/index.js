/**
 *
 */
import React from 'react';
import { render } from 'react-dom';
import RouteMap from './routes';
import 'assets/main.scss';
const root = document.createElement('div');
root.className = 'page';
document.body.appendChild(root);
render(
  <>
    <RouteMap />
  </>,
  root
);
