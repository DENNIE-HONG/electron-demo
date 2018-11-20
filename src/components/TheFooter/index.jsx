/**
 * 底部通用模块
 * @author luyanhong 2018-11-20
*/
import React from 'react';
import './TheFooter.scss';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="com-footer">
      <div className="com-footer-content">
        <ul className="com-footer-list global-clearfix">
          <li className="com-footer-item">
            <h4>相关资源</h4>
            <a href="https://github.com/DENNIE-HONG/electron-demo">
              github
              <i className="iconfont icon-github"></i>
            </a>
          </li>
          <li className="com-footer-item">
            <h4>邮箱</h4>
            <span>wljay-777@qq.com</span>
          </li>
        </ul>
      </div>
      <div className="com-footer-bottom">
        <small>
          ©{year} Made with <i className="iconfont icon-yonghu-xianxing"></i>
          luyanhong
        </small>
      </div>
    </footer>
  );
};
export default Footer;
