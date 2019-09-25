/**
 * 通用左边侧边栏目录
 * @author luyanhong 2018-11-20
*/
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactReduxContext } from 'react-redux';
import { getLoginStatus } from 'api/login';
import { loginAction } from '@/redux/actions';
import './TheSider.scss';
import login from './UserLogin';

class Siderbar extends PureComponent {
  static contextType = ReactReduxContext;

  constructor (props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  async componentDidMount () {
    try {
      const res = await getLoginStatus();
      console.log(res);
      if (res.code === 200) {
        const { store } = this.context;
        const payload = {
          nickName: res.profile.nickname,
          avatar: res.profile.avatarUrl
        };
        store.dispatch(loginAction(payload));
        this.setState({
          isLogin: true
        });
      }
    } catch {
      //
    }
  }

  render () {
    const { store } = this.context;
    const { nickName, avatar } = store.getState().loginReducer;
    const { isLogin } = this.state;
    return (
      <aside className="com-sider">
        <header className="com-sider-head">
          <div className="com-sider-pic">
            <img src={avatar} alt="用户" />
          </div>
          {isLogin ? (
            <h4 className="com-sider-name">{nickName}</h4>
          ) : (<div className="nav-link" onClick={login}>登录网易音乐</div>)}
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
  }
}
export default Siderbar;
