import React from 'react';
import { NavLink } from 'react-router-dom';
const SearchHeaderSuggest = (props) => {
  const { results = null } = props;
  return results && (
    <div className="search-h-results">
      {results.songs && (
        <section className="results-box">
          <h4 className="results-title">单曲</h4>
          <ul>
            {results.songs.map((song) => (
              <li className="results-item results-item-song" key={song.id}>
                <NavLink to={`/song/${song.id}`} key={song.id}>{song.name}</NavLink>
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
                <NavLink to={`/artist/${artist.id}`} key={artist.id}>
                  <img className="results-artist-img img-circle" src={artist.img1v1Url} />
                  <span>{artist.name}</span>
                </NavLink>
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
                <NavLink to={`/album/${album.id}`}>
                  <span>{album.name} - {album.artist.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
export default SearchHeaderSuggest;
