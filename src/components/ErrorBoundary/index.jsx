import React from 'react';
import ErrorImg from 'assets/img/error.jpeg';
import './ErrorBoundary.scss';
class ErrorBoundary extends React.Component {
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
    if (hasError) {
      return (
        <div className="error">
          <h2 className="error-title">bibi~ 崩溃啦！</h2>
          <p className="error-desc">别担心上车，我带你回去。</p>
          <div className="error-btn" onClick={this.reStart}>返回主页</div>
          <div className="error-pic">
            <img className="error-img" src={ErrorImg} />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
