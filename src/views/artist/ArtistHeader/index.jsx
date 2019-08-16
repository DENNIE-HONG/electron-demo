import React, { PureComponent } from 'react';
class ArtistHeader extends PureComponent {
  render () {
    return (
      <div className="artist-h">
        <div className="artist-h-pic">
          <img src="" title={54545} />
        </div>
        <div className="artist-h-name">
          <h3>名字</h3>
        </div>
      </div>
    );
  }
}
export default ArtistHeader;
