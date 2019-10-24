/**
 * @file 报错模块 容器组件
 * @author luyanhong 2019-10-24
 */
import React from 'react';
import ErrorBoundaryCom from 'coms/ErrorBoundary';
function ErrorBoundary (WrappedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        hasError: false
      };
    }

    reStart = () => {
      this.setState({ hasError: false },
        () => {
          window.location.href = '/';
        });
    }

    componentDidCatch (error, info) {
      // Display fallback UI
      console.log(error, info);
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
    }

    render () {
      const { hasError } = this.state;
      const newProps = {
        hasError,
        reStart: this.reStart
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}
export default ErrorBoundary(ErrorBoundaryCom);
