import React, { Component } from 'react';
import { getProgramDetail } from 'server/api/dj';
import LazyImage from 'coms/LazyImage';
import ProgramHeader from 'coms/ProgramHeader';
import './program.scss';
class Program extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null
    };
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const [detailRes] = await Promise.all([
        getProgramDetail(id)
      ]);
      this.setState({
        info: detailRes.program
      });
    } catch (err) {
      console.log('网络出现问题');
    }
  }

  render () {
    const { info } = this.state;
    return (
      info && (
        <div className="program">
          <header className="program-head">
            <ProgramHeader picUrl={info.coverUrl} name={info.name}>
              <div className="program-head-brand">
                <i className="iconfont icon-music"></i>
                {info.dj.brand}
              </div>
            </ProgramHeader>
          </header>
        </div>
      )
    );
  }
}
export default Program;
