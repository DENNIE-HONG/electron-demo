/**
 * 通用左边侧边栏目录
 * @author luyanhong 2018-11-20
*/
import React from 'react';
import './TheSider.scss';
import avatar from 'assets/img/user.jpg';
const Siderbar = () => {
  console.log(1);
  return (
    <aside className="com-sider">
      <header className="com-sider-head">
        <div className="com-sider-pic">
          <img src={avatar} alt="用户" />
        </div>
        <h4 className="com-sider-name">electron宝宝</h4>
      </header>
      <dl className="com-sider-list">
        <dt className="sider-list-title">音乐馆</dt>
        <dd className="sider-list-item active">
          <i className="iconfont icon-music"></i>
          <span>推荐</span>
        </dd>
      </dl>
    </aside>
  );
};
export default Siderbar;