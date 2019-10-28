/**
 * @file history前进、后退模块 容器组件
 * @author luyanhong 2019-09-03
 */
import React, { PureComponent } from 'react';
import { createHashHistory } from 'history';
import SearchHeaderHistoryCom from 'coms/SearchHeader/SearchHeaderHistory';
const history = createHashHistory();
function SearchHeaderHistory (WrappedComponent) {
  return class extends PureComponent {
    constructor (props) {
      super(props);
      this.current = 0;
      this.isBack = false;
      this.backCount = 0;
    }

    // 跳页，length增加，后退则不变
    componentDidMount () {
      history.listen(() => {
        // 后退
        if (this.isBack) {
          this.current -= 1;
        } else {
          this.current += 1;
        }
        this.forceUpdate();
        this.isBack = false;
      });
    }

    // 返回上一页
    backHistory = () => {
      this.isBack = true;
      this.current && history.goBack();
      this.backCount += 1;
    }

    // 后退过，才能前进
    forwardHistory = () => {
      this.backCount && history.goForward();
      this.backCount -= 1;
    }

    render () {
      const disableBack = !this.current;
      const { backCount } = this;
      const newProps = {
        disableBack,
        backCount,
        backHistory: this.backHistory,
        forwardHistory: this.forwardHistory
      };
      return <WrappedComponent {...newProps} />;
    }
  };
}
export default SearchHeaderHistory(SearchHeaderHistoryCom);
