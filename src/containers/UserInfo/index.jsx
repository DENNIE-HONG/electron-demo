/**
 * @file 登录后用户信息模块 容器组件
 * @author luyanhong 2019-09-27
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoginStatus, logout } from 'api/login';
import login from 'coms/UserLogin';
import PropTypes from 'prop-types';
import UserInfoCom from 'coms/TheSider/UserInfo';
import { loginAction } from '@/redux/actions';
const mapStateToProps = (state) => {
  const { userInfo, isLogin } = state.loginReducer;
  return {
    userInfo,
    isLogin
  };
};
// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => ({
  updateUser: (profile) => {
    const payload = {
      userInfo: profile
    };
    dispatch(loginAction(payload));
  },
  logout: () => {
    dispatch({
      type: 'logout'
    });
  }
});
function UserInfo (WrappedComponent) {
  return class extends Component {
    static propTypes = {
      updateUser: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    }

    async componentDidMount () {
      try {
        const res = await getLoginStatus();
        if (res.code === 200) {
          this.props.updateUser(res.profile);
        }
      } catch {
        //
      }
    }

    loginAfter = () => {
      login();
    }

    // 退出登录
    logout = () => {
      logout();
      this.props.logout();
    }

    render () {
      const { userInfo, isLogin } = this.props;
      const newProps = {
        userInfo,
        isLogin,
        logout: this.logout,
        loginAfter: this.loginAfter
      };
      return <WrappedComponent {...newProps} />;
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo(UserInfoCom));
