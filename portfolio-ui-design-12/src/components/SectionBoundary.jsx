import { Component } from "react";

// A failed section download must not remove the rest of the portfolio.
export default class SectionBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <div role="alert" style={{ minHeight: "100vh", padding: "2rem" }}>
        <p>This section could not be loaded.</p>
        <button type="button" onClick={() => window.location.reload()}>Reload page</button>
      </div>;
    }
    return this.props.children;
  }
}
