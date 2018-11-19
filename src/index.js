/**
 *
 */
import React from 'react';
import { render } from 'react-dom';
// import Footer from 'coms/layout/footer';
import RouteMap from './routes';
const root = document.createElement('div');
root.className = 'page';
document.body.appendChild(root);
render(
  <React.Fragment>
    <div className="main"><RouteMap /></div>
  </React.Fragment>,
  root
);
