/**
 * @file 登录模块
 * @author luyanhong 2019-09-18
 */
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import PropTypes from 'prop-types';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import { loginPhone } from 'api/login';
import './UserLogin.scss';
class UserLogin extends Component {
  static propTypes = {
    domNode: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      mobile: 0,
      mobilePW: '',
      error: ''
    };
  }

  handleMobileLogin = (e) => {
    const error = this.check();
    if (error) {
      this.setState({
        error
      });
      return;
    }
    this.composeMobileData();
  }

  composeMobileData () {
    this.setState({
      error: ''
    });
    const { value: mobile } = this.mobile;
    const { value: password } = this.mobilePW;
    console.log(mobile, password);
  }

  // 校验
  check () {
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
    if (password.trim() === '') {
      errorMsg = '请输入密码';
      return errorMsg;
    }
  }

  render () {
    const { domNode } = this.props;
    const { error } = this.state;
    const loginContainer = (
      <div className="login">
        <i className="iconfont icon-close-circle-fill login-close"></i>
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
          <BaseTabsPane label="邮箱登录" name="mail">ee</BaseTabsPane>
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

function login () {
  const root = document.createElement('div');
  root.className = 'modal-bg-transparent';
  document.body.appendChild(root);
  render(
    <UserLogin domNode={root} />,
    root
  );
}

export default login;
