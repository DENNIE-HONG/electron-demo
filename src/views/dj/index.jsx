import React, { Component } from 'react';
import { getProgramRecommend, getDjCatelist, getDjRecommend } from 'server/api/dj';
import LazyImage from 'coms/LazyImage';
import { NavLink } from 'react-router-dom';
import './dj.scss';
class Dj extends Component {
  constructor (props) {
    super(props);
    this.state = {
      programs: [],
      cateList: [],
      newList: [],
      type: ''
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
  }

  fetch (id) {
    getDjRecommend(id).then((res) => {
      if (res.code === 200) {
        this.setState({
          newList: res.djRadios.slice(0, 5),
          type: res.djRadios[0].category
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render () {
    const {
      programs, cateList, newList, type
    } = this.state;
    return (
      <div className="dj">
        <div className="dj-classification">
          <ul className="dj-classification-list">
            {cateList.map((li) => (
              <li
                key={li.id}
                className={`dj-classification-item ${type === li.name ? 'active' : ''}`}
                onClick={this.fetch.bind(this, li.id)}
              >{li.name}
              </li>
            ))}
          </ul>
        </div>
        {newList.length > 0 && (
          <section className="dj-new">
            <div className="title">
              <i className="iconfont icon-circle"></i>
              <span className="title-txt">优秀新电台</span>
            </div>
            <ul className="dj-new-list">
              {newList.map((sub) => (
                <li className="dj-new-item" key={sub.id}>
                  <NavLink to={`/program/${sub.id}`}>
                    <div className="dj-new-pic">
                      <LazyImage src={`${sub.picUrl}?param=160y160`} alt={sub.name} />
                    </div>
                    <h4 className="dj-new-name">{sub.name}</h4>
                    <span>{sub.rcmdtext}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="dj-recommend">
          <div className="title">
            <i className="iconfont icon-circle"></i>
            <span className="title-txt">推荐节目</span>
          </div>
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
