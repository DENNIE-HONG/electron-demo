/**
 * 通用左边侧边栏目录
 * @author luyanhong 2018-11-20
*/
import React from 'react';
import { NavLink } from 'react-router-dom';
import UserInfo from './UserInfo';
import './TheSider.scss';

const Siderbar = () => (
  <aside className="com-sider">
    <UserInfo />
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
          <i className="iconfont icon-ranking"></i>
          <h3>排行</h3>
        </NavLink>
      </dd>
      <dd className="sider-list-item">
        <NavLink to="/playlist" activeClassName="active">
          <i className="iconfont icon-playlist"></i>
          <h3>歌单</h3>
        </NavLink>
      </dd>
      <dd className="sider-list-item">
        <NavLink to="/dj" activeClassName="active">
          <i className="iconfont icon-radio"></i>
          <h3>电台</h3>
        </NavLink>
      </dd>
    </dl>
  </aside>
);
export default Siderbar;
