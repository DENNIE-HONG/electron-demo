import React, { Component } from 'react';
import { getProgramRecommend, getDjCatelist, getDjRecommend } from 'api/dj';
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
      categoryId: Number(props.match.params.categoryId)
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
      const { categoryId } = this.state;
      categoryId && this.fetch(categoryId);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 获取推荐新电台资源
   * @param {Number}  电台分类id
  */
  fetch (id) {
    getDjRecommend(id).then((res) => {
      if (res.code === 200) {
        this.setState({
          newList: res.djRadios.slice(0, 5),
          categoryId: id
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render () {
    const {
      programs, cateList, newList, categoryId
    } = this.state;
    return (
      <div className="dj">
        <div className="dj-classification">
          <ul className="dj-classification-list">
            {cateList.map((li) => (
              <li
                key={li.id}
                className={`dj-classification-item ${categoryId === li.id ? 'active' : ''}`}
                onClick={() => this.fetch(li.id)}
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
                  <NavLink to={`/djRadio/${sub.id}`}>
                    <div className="dj-new-pic">
                      <LazyImage src={`${sub.picUrl}?param=160y160`} alt={sub.name} />
                    </div>
                    <h4 className="dj-new-name">{sub.name}</h4>
                    <span className="dj-new-txt">{sub.rcmdtext}</span>
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
                <NavLink to={`/program/${item.id}`}>
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
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
export default Dj;
