import React, { Component } from 'react';
import { getProgramRecommend, getDjCatelist } from 'server/api/dj';
import LazyImage from 'coms/LazyImage';
import './dj.scss';
class Dj extends Component {
  constructor (props) {
    super(props);
    this.state = {
      programs: [],
      cateList: []
    };
  }

  async componentDidMount () {
    try {
      const [programRes, cateListRes] = await Promise.all([
        getProgramRecommend(),
        getDjCatelist()
      ]);
      this.setState({
        programs: programRes.programs,
        cateList: cateListRes.categories
      });
    } catch (err) {
      console.log(err);
    }
    getProgramRecommend().then((res) => {
      if (res.code === 200) {
        this.setState({
          programs: res.programs
        });
        console.log(res);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  fetch () {

  }

  render () {
    const { programs, cateList } = this.state;
    return (
      <div className="dj">
        <div className="dj-classification">
          <ul className="dj-classification-list">
            {cateList.map((li) => (
              <li key={li.id} className="dj-classification-item">{li.name}</li>
            ))}
          </ul>
        </div>
        <section>
          <ul className="dj-list">
            {programs.map((item) => (
              <li className="dj-list-item" key={item.id}>
                <div className="dj-list-pic">
                  <LazyImage src={`${item.coverUrl}?param=120y120 `} alt={item.name} />
                </div>
                <div className="dj-list-info">
                  <h4 className="dj-list-name">{item.name}</h4>
                  <div className="dj-list-info-artist">{item.radio.name}</div>
                  <p className="dj-list-info-txt">
                    <span className="dj-list-info-periods">共{item.radio.programCount}期</span>
                    <span>订阅{item.radio.subCount}次</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
export default Dj;
