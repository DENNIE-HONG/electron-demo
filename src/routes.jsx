import React, { Component } from 'react';
import { BrowserRouter as HashRouter, Route } from 'react-router-dom';
import Home from '@/views/home';
import NotFound from '@/views/404';
class RouteMap extends Component {
  render () {
    return (
      <HashRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </div>
      </HashRouter>
    );
  }
}
export default RouteMap;
