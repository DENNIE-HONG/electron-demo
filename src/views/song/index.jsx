/**
 * @file 单曲页
 * @author luyanhong 2019-08-05
 */
import React, { Component } from 'react';
import { getSongDetail } from 'api/song';
import ProgramHeader from 'coms/ProgramHeader';
class Song extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: ''
    };
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      console.log(id);
      const res = await getSongDetail(id);
      if (res.code === 200) {
        const [info] = res.songs;
        console.log(info);
        this.setState({
          info
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    const { info } = this.state;
    return info && (
      <div className="song">
        <header className="song-head">
          <ProgramHeader name={info.name} tag="单曲" picUrl={info.al.picUrl} />
        </header>
      </div>
    );
  }
}
export default Song;
