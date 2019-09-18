/**
 * @file 登录模块
 * @author luyanhong 2019-09-18
 */
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import PropTypes from 'prop-types';
class UserLogin extends Component {
  static propTypes = {
    domNode: PropTypes.object.isRequired
  }

  render () {
    const { domNode } = this.props;
    const loginContainer = (
      <div className="login">

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
