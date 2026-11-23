import { Component } from 'react';

// A failed model or unavailable WebGL should not hide the rest of the page.
class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <p role="status" className="p-4 text-center text-white-600">3D preview unavailable.</p>
    ) : this.props.children;
  }
}

export default SceneBoundary;
