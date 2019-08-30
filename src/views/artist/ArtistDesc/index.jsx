/**
 * @file 歌手简介
 * @param {String}  name, 必须，歌手名字
 * @param {String}  id, 必须，歌手id
 * @param {Boolean} isFetch, 是否请求歌手描述api, 默认否
 * @author luyanhong 2019-08-30
 */
import React, { PureComponent } from 'react';
import { getArtistDesc } from 'api/artist';
import PropTypes from 'prop-types';
const DESC_DEFAULT = '暂无介绍';
class ArtistDesc extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    isFetch: PropTypes.bool
  }

  static defaultProps = {
    isFetch: false
  }

  state = {
    desc: null
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isFetch !== nextProps.isFetch) {
      this.fetchDesc();
    }
  }

  async fetchDesc () {
    const { id } = this.props;
    const resDesc = await getArtistDesc(id);
    this.setState({
      desc: resDesc
    });
  }

  render () {
    const { name } = this.props;
    const { desc } = this.state;
    return desc && (
      <section className="artist-desc">
        <h4 className="artist-desc-title">
          {name}简介
        </h4>
        <p className="artist-desc-content">
          {desc.briefDesc || DESC_DEFAULT}
        </p>
        {desc.introduction.length && (
          <ul className="artist-desc-intro">
            {desc.introduction.map((item) => (
              <li className="artist-desc-item" key={item.ti}>
                <h4 className="item-title">{item.ti}</h4>
                <p className="item-txt">{item.txt}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}
export default ArtistDesc;
