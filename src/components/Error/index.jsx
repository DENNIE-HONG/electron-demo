import React from 'react';
class Error extends React.Component {
  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    console.log(111111);
    console.log(error, info);
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
  }

  render () {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className="">
          test
          <div>eee</div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default Error;
