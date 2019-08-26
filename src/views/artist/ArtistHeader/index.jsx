import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ShowDesc from 'coms/ShowDesc';
import './ArtistHeader.scss';
class ArtistHeader extends PureComponent {
  static propTypes = {
    info: PropTypes.object
  }

  static defaultProps = {
    info: null
  }

  render () {
    const { info } = this.props;
    return info && (
      <div className="artist-h">
        <div className="artist-h-pic">
          <img src={info.img1v1Url} title={info.name} className="artist-h-img img-circle" />
        </div>
        <div className="artist-h-info">
          <h3 className="artist-h-name">{info.name}</h3>
          <ShowDesc text={info.briefDesc || '暂无信息'} maxHeight={60} />
        </div>
      </div>
    );
  }
}
export default ArtistHeader;
