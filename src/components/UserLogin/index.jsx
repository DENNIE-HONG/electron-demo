/**
 * @file 登录模块
 * @param {Object}   domNode, 必须，挂载的dom节点
 * @param {Function} callback, 登录成功的回调函数，参数为用户信息
 * @author luyanhong 2019-09-18
 */
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import PropTypes from 'prop-types';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import { loginPhone, loginMail } from 'api/login';
import store from '@/redux/store';
import { loginAction } from '@/redux/actions';
import './UserLogin.scss';
class UserLogin extends Component {
  static propTypes = {
    domNode: PropTypes.object.isRequired,
    callback: PropTypes.func
  }

  static defaultProps = {
    callback: undefined
  }

  constructor (props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  close = () => {
    this.props.domNode.parentNode.removeChild(this.props.domNode);
    ReactDOM.unmountComponentAtNode(this.props.domNode);
  }

  // 手机登录
  handleMobileLogin = async () => {
    const error = this.checkMobileLogin();
    if (error) {
      this.setState({
        error
      });
      return;
    }
    this.state.error && this.setState({
      error: ''
    });
    const { value: mobile } = this.mobile;
    const { value: password } = this.mobilePW;
    try {
      const res = await loginPhone(mobile, password);
      this.updateUserInfo(res.profile);
      this.props.callback && this.props.callback(res.profile);
      this.close();
    } catch (err) {
      this.setState({
        error: err
      });
    }
  }

  // 邮箱登录
  handleMailLogin = async () => {
    const error = this.checkMailLogin();
    if (error) {
      this.setState({
        error
      });
      return;
    }
    this.state.error && this.setState({
      error: ''
    });
    const { value: mail } = this.mail;
    const { value: password } = this.mailPW;
    try {
      const res = await loginMail(mail, password);
      this.updateUserInfo(res.profile);
      this.props.callback && this.props.callback(res.profile);
      this.close();
    } catch (err) {
      this.setState({
        error: err
      });
    }
  }

  // 校验
  checkMobileLogin () {
    const { value: mobile } = this.mobile;
    const { value: password } = this.mobilePW;
    let errorMsg;
    if (!mobile) {
      errorMsg = '请输入账号';
      return errorMsg;
    }
    if (mobile.length !== 11) {
      errorMsg = '请输入11位手机号';
      return errorMsg;
    }
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
      errorMsg = '请输入正确的手机格式';
      return errorMsg;
    }
    if (password.trim() === '') {
      errorMsg = '请输入密码';
      return errorMsg;
    }
  }

  // 校验邮箱登录
  checkMailLogin () {
    const { value: mail } = this.mail;
    const { value: password } = this.mailPW;
    let errorMsg;
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@163\.com$/;
    if (!mail) {
      errorMsg = '请输入邮箱';
      return errorMsg;
    }
    if (mail.length > 50) {
      errorMsg = '邮箱地址过长';
      return errorMsg;
    }
    if (mail.length <= 8) {
      errorMsg = '邮箱地址以@163.com结尾';
      return errorMsg;
    }
    if (!reg.test(mail)) {
      errorMsg = '请输入正确的163邮箱格式';
      return errorMsg;
    }
    if (password.trim() === '') {
      errorMsg = '请输入密码';
      return errorMsg;
    }
  }

  // 更新用户头像、昵称
  updateUserInfo (profile) {
    const payload = {
      userInfo: profile
    };
    store.dispatch(loginAction(payload));
  }

  render () {
    const { domNode } = this.props;
    const { error } = this.state;
    const loginContainer = (
      <div className="login">
        <i className="iconfont icon-close-circle-fill login-close" onClick={this.close}></i>
        <BaseTabs activeName="mobile" textAlign="center">
          <BaseTabsPane label="手机登录" name="mobile">
            <form className="login-mobile" onSubmit={this.handleMobileLogin}>
              <label htmlFor="mobile" className="login-item">
                <i className="iconfont icon-user"></i>
                <input placeholder="输入账号" id="mobile" type="number" maxLength="11" ref={(input) => { this.mobile = input; }} />
              </label>
              <label htmlFor="password" className="login-item">
                <i className="iconfont icon-lock"></i>
                <input placeholder="输入密码" id="password" type="password" ref={(input) => { this.mobilePW = input; }} />
              </label>
              <button type="submit" className="login-btn">立即登录</button>
            </form>
          </BaseTabsPane>
          <BaseTabsPane label="邮箱登录" name="mail">
            <form className="login-mail" onSubmit={this.handleMailLogin}>
              <label htmlFor="mail" className="login-item">
                <i className="iconfont icon-mail"></i>
                <input placeholder="输入邮箱" type="mail" ref={(input) => { this.mail = input; }} id="mail" />
              </label>
              <label htmlFor="mailpw" className="login-item">
                <i className="iconfont icon-lock"></i>
                <input placeholder="输入密码" id="mailpw" type="password" ref={(input) => { this.mailPW = input; }} />
              </label>
              <button type="submit" className="login-btn">立即登录</button>
            </form>
          </BaseTabsPane>
        </BaseTabs>
        <div className={`login-error${error ? ' active' : ''}`}>
          <i className="iconfont icon-warning"></i>
          <span className="login-error-txt">{error}</span>
        </div>
      </div>
    );
    return ReactDOM.createPortal(
      <>{ loginContainer }</>,
      domNode
    );
  }
}
/**
 * 页面上新插入登录弹窗模块
 * @param {Function} callback, 登录成功的回调函数
 */
function login (callback) {
  const root = document.createElement('div');
  root.className = 'modal-bg-transparent';
  document.body.appendChild(root);
  render(
    <UserLogin domNode={root} callback={callback} />,
    root
  );
}

export default login;
export { UserLogin };
