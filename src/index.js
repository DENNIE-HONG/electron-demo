/**
 *
 */
import React from 'react';
import { render } from 'react-dom';
import Footer from 'coms/TheFooter';
import RouteMap from './routes';
import 'assets/main.scss';
const root = document.createElement('div');
root.className = 'page';
document.body.appendChild(root);
render(
  <React.Fragment>
    <div className="main">
      <RouteMap />
    </div>
    <Footer />
  </React.Fragment>,
  root
);
