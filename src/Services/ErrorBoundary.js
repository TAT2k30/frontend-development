import React, { Component } from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorList: []
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
    this.setState(prevState => ({
      errorList: [...prevState.errorList, error]
    }));
  }

  handleTokenRemoval = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Oops! Something went wrong.</h2>
          <p>Please try refreshing the page.</p>
          <button className="btn btn-danger" onClick={this.handleTokenRemoval}>Click this</button>
          <div className="error-list">
            <h3>Error List:</h3>
            <ul>
              {this.state.errorList.map((error, index) => (
                <li key={index}>{error.toString()}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
