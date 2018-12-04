/**
 *
 */
import React from 'react';
import { render } from 'react-dom';
import Footer from 'coms/TheFooter';
import Siderbar from 'coms/TheSider';
import RouteMap from './routes';
import 'assets/main.scss';
const root = document.createElement('div');
root.className = 'page';
document.body.appendChild(root);
render(
  <React.Fragment>
    <Siderbar />
    <div className="main">
      <div className="content"><RouteMap /></div>
      <Footer />
    </div>
  </React.Fragment>,
  root
);
