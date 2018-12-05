import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Footer from 'coms/TheFooter';
import Siderbar from 'coms/TheSider';
import Home from '@/views/home';
import Top from '@/views/top';
// import NotFound from '@/views/404';
class RouteMap extends Component {
  render () {
    return (
      <Router>
        <React.Fragment>
          <Siderbar />
          <div className="main">
            <div className="content">
              <Route path="/top" component={Top} />
              <Route path="/" exact component={Home} />
            </div>
            <Footer />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}
export default RouteMap;
