import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Footer from 'coms/TheFooter';
import Siderbar from 'coms/TheSider';
import PlayBox from 'coms/PlayBox';
import Loading from 'coms/Loading';

class RouteMap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playList: [],
      playId: 0
    };
    const self = this;
    this.AsyncHome = Loadable({
      loader: () => import(/* webpackChunkName: "home" */ '@/views/home'),
      loading: Loading,
      render (loaded, rest) {
        const Home = loaded.default;
        return <Home setMusic={self.setMusic} {...rest} />;
      }
    });
    this.AsyncPlaylist = Loadable({
      loader: () => import(/* webpackChunkName: "playlist" */ '@/views/playlist'),
      loading: Loading,
      render (loaded, rest) {
        return <loaded.default setMusic={self.setMusic} {...rest} />;
      }
    });
    this.AsyncTop = Loadable({
      loader: () => import(/* webpackChunkName: 'top' */ '@/views/top'),
      loading: Loading,
      render (loaded, rest) {
        return <loaded.default setMusic={self.setMusic} {...rest} />;
      }
    });
    this.AsyncDjRadio = Loadable({
      loader: () => import(/* webpackChunkName: 'djRadio' */ '@/views/djRadio'),
      loading: Loading,
      render (loaded, rest) {
        return <loaded.default setMusic={self.setMusic} {...rest} />;
      }
    });
    this.AsyncProgram = Loadable({
      loader: () => import(/* webpackChunkName: 'program' */ '@/views/program'),
      loading: Loading,
      render (loaded, rest) {
        return <loaded.default setMusic={self.setMusic} {...rest} />;
      }
    });
    this.AsyncDj = Loadable({
      loader: () => import(/* webpackChunkName: 'dj' */ '@/views/dj'),
      loading: Loading,
      render (loaded, rest) {
        return <loaded.default {...rest} />;
      }
    });
    this.AsyncPlaylistDetail = Loadable({
      loader: () => import(/* webpackChunkName: 'playlist-detail' */ '@/views/playlist-detail'),
      loading: Loading,
      render (loaded, rest) {
        return <loaded.default setMusic={self.setMusic} {...rest} />;
      }
    });
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
        <>
          <Siderbar />
          <div className="main">
            <main className="content">
              <Route
                path="/top"
                component={this.AsyncTop}
              />
              <Route
                path="/"
                exact
                component={this.AsyncHome}
              />
              <Route
                path="/playlist"
                exact
                component={this.AsyncPlaylist}
              />
              <Route
                path="/playlist/:id"
                component={this.AsyncPlaylistDetail}
              />
              <Route
                path="/dj/:categoryId?"
                component={this.AsyncDj}
              />
              <Route
                path="/djRadio/:id"
                component={this.AsyncDjRadio}
              />
              <Route
                path="/program/:id"
                component={this.AsyncProgram}
              />
              <PlayBox playList={playList} id={playId} />
            </main>
            <Footer />
          </div>
        </>
      </Router>
    );
  }
}
export default RouteMap;
