import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Footer from 'coms/TheFooter';
import Siderbar from 'coms/TheSider';
import PlayBox from 'coms/PlayBox';
import Home from '@/views/home';
import Top from '@/views/top';
import Playlist from '@/views/playlist';
import Dj from '@/views/dj';
import DjRadio from '@/views/djRadio';
// import NotFound from '@/views/404';
class RouteMap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playList: [],
      playId: 0
    };
  }

  setMusic = (playList, playId) => {
    this.setState({
      playList,
      playId
    });
  }

  render () {
    const { playList, playId } = this.state;
    return (
      <Router>
        <React.Fragment>
          <Siderbar />
          <div className="main">
            <main className="content">
              <Route
                path="/top"
                render={(props) => (<Top setMusic={this.setMusic} {...props} />)}
              />
              <Route
                path="/"
                exact
                render={(props) => (<Home setMusic={this.setMusic} {...props} />)}
              />
              <Route
                path="/playlist"
                render={(props) => (<Playlist setMusic={this.setMusic} {...props} />)}
              />
              <Route
                path="/dj/:categoryId?"
                component={Dj}
              />
              <Route
                path="/djRadio/:id"
                render={(props) => (<DjRadio setMusic={this.setMusic} {...props} />)}
              />
              <PlayBox playList={playList} id={playId} />
            </main>
            <Footer />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}
export default RouteMap;
