import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Footer from 'coms/TheFooter';
import Siderbar from 'coms/TheSider';
import PlayBox from 'coms/PlayBox';
import Loading from 'coms/Loading';
import ErrorBoundary from 'coms/ErrorBoundary';
import SearchHeader from 'coms/SearchHeader';

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
        const Playlist = loaded.default;
        return <Playlist setMusic={self.setMusic} {...rest} />;
      }
    });
    this.AsyncTop = Loadable({
      loader: () => import(/* webpackChunkName: 'top' */ '@/views/top'),
      loading: Loading,
      render (loaded, rest) {
        const Top = loaded.default;
        return <Top setMusic={self.setMusic} {...rest} />;
      }
    });
    this.AsyncDjRadio = Loadable({
      loader: () => import(/* webpackChunkName: 'djRadio' */ '@/views/djRadio'),
      loading: Loading,
      render (loaded, rest) {
        const DjRadio = loaded.default;
        return <DjRadio setMusic={self.setMusic} key={rest.match.url} {...rest} />;
      }
    });
    this.AsyncProgram = Loadable({
      loader: () => import(/* webpackChunkName: 'program' */ '@/views/program'),
      loading: Loading,
      render (loaded, rest) {
        const Program = loaded.default;
        return <Program setMusic={self.setMusic} key={rest.match.url} {...rest} />;
      }
    });
    this.AsyncDj = Loadable({
      loader: () => import(/* webpackChunkName: 'dj' */ '@/views/dj'),
      loading: Loading,
      render (loaded, rest) {
        const Dj = loaded.default;
        return <Dj key={rest.match.url} {...rest} />;
      }
    });
    this.AsyncPlaylistDetail = Loadable({
      loader: () => import(/* webpackChunkName: 'playlist-detail' */ '@/views/playlist-detail'),
      loading: Loading,
      render (loaded, rest) {
        return <loaded.default setMusic={self.setMusic} key={rest.match.url} {...rest} />;
      }
    });
    this.AsyncSong = Loadable({
      loader: () => import(/* webpackChunkName: 'song' */ '@/views/song'),
      loading: Loading,
      render (loaded, rest) {
        const Song = loaded.default;
        return <Song setMusic={self.setMusic} {...rest} key={rest.match.url} />;
      }
    });
    this.AsyncAlbum = Loadable({
      loader: () => import(/* webpackChunkName: 'album' */ '@/views/album'),
      loading: Loading,
      render (loaded, rest) {
        const Album = loaded.default;
        return <Album setMusic={self.setMusic} {...rest} key={rest.match.url} />;
      }
    });
    this.AsyncArtist = Loadable({
      loader: () => import(/* webpackChunkName: 'artist' */ '@/views/artist'),
      loading: Loading,
      render (loaded, rest) {
        const Artist = loaded.default;
        return <Artist setMusic={self.setMusic} {...rest} key={rest.match.url} />;
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
              <ErrorBoundary>
                <SearchHeader />
                <Route path="/top" component={this.AsyncTop} />
                <Route path="/" exact component={this.AsyncHome} />
                <Route path="/playlist" exact component={this.AsyncPlaylist} />
                <Route path="/playlist/:id" exact component={this.AsyncPlaylistDetail} />
                <Route path="/dj/:categoryId?" component={this.AsyncDj} />
                <Route path="/djRadio/:id" component={this.AsyncDjRadio} />
                <Route path="/program/:id" component={this.AsyncProgram} />
                <Route path="/song/:id" exact component={this.AsyncSong} />
                <Route path="/album/:id" component={this.AsyncAlbum} />
                <Route path="/artist/:id" component={this.AsyncArtist} />
                <PlayBox playList={playList} id={playId} />
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </>
      </Router>
    );
  }
}
export default RouteMap;
