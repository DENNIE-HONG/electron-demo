import React, { Component } from 'react';
import { getArtistDesc } from 'api/artist';
class Artist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null
    };
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    const [resDesc] = await Promise.all([
      getArtistDesc(id)
    ]);
    console.log(resDesc);
  }

  render () {
    return (
      <div className="artist">
        歌手
      </div>
    );
  }
}
export default Artist;
