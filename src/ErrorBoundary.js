// mostly took from react docs

import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // would log to sentry/azure monitor/new relic/track js <- these are all error monitoring services
    console.error("ErrorBoundary caught an error", error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          This listing has an error. <Link to="/"> Click here</Link> to go back
          to the main page or wait 5 seconds.
        </h2>
      );
    }
    return this.props.children;
  }
}

// this is the child of errorboundary, ^ that runs, if nothing is wrong, render everything in Errorboundary below
<ErrorBoundary>
  <h1>Hi there</h1>
</ErrorBoundary>;

export default ErrorBoundary;
