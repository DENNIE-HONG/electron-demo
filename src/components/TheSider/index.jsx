/**
 * 通用左边侧边栏目录
 * @author luyanhong 2018-11-20
*/
import React from 'react';
import { NavLink } from 'react-router-dom';
import './TheSider.scss';
import avatar from 'assets/img/user.jpg';
const Siderbar = () => (
  <aside className="com-sider">
    <header className="com-sider-head">
      <div className="com-sider-pic">
        <img src={avatar} alt="用户" />
      </div>
      <h4 className="com-sider-name">electron宝宝</h4>
    </header>
    <dl className="com-sider-list">
      <dt className="sider-list-title"><h2>音乐馆</h2></dt>
      <dd className="sider-list-item">
        <NavLink exact to="/" activeClassName="active">
          <i className="iconfont icon-music"></i>
          <h3>推荐</h3>
        </NavLink>
      </dd>
      <dd className="sider-list-item">
        <NavLink to="/top" activeClassName="active">
          <i className="iconfont icon-music"></i>
          <h3>排行</h3>
        </NavLink>
      </dd>
    </dl>
  </aside>
);
export default Siderbar;
