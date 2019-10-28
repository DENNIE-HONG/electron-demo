/**
 * @file 搜索结果列表 展示组件
 * @author luyanhong 2019-08
 */
import React from 'react';
import { Link } from 'react-router-dom';
const SearchHeaderSuggest = (props) => {
  const { results = null, onClick } = props;
  return results && (
    <div className="search-h-results" onClick={onClick}>
      {results.songs && (
        <section className="results-box">
          <h4 className="results-title">单曲</h4>
          <ul>
            {results.songs.map((song) => (
              <li className="results-item results-item-song" key={song.id}>
                <Link to={`/song/${song.id}`} key={song.id}>{song.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {results.artists && (
        <section className="results-box">
          <h4 className="results-title">歌手</h4>
          <ul>
            {results.artists.map((artist) => (
              <li className="results-item results-item-artist" key={artist.id}>
                <Link to={`/artist/${artist.id}`} key={artist.id}>
                  <img className="results-artist-img img-circle" src={artist.img1v1Url} />
                  <span>{artist.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {results.albums && (
        <section className="results-box">
          <h4 className="results-title">专辑</h4>
          <ul>
            {results.albums.map((album) => (
              <li className="results-item" key={album.id}>
                <Link to={`/album/${album.id}`}>
                  <span>{album.name} - {album.artist.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
export default SearchHeaderSuggest;
