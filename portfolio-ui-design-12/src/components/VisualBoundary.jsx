import { Component } from "react";

// Keep the portfolio usable if WebGL or a 3D asset cannot load.
class VisualBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <p role="status">3D visual unavailable.</p> : this.props.children;
  }
}

export default VisualBoundary;
