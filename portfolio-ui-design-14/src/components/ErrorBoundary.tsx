import { Component, type ReactNode } from "react";

interface Props { children: ReactNode; fallback: ReactNode; onError?: () => void }

// A failed lazy chunk or 3D renderer must not unmount unrelated content.
export default class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError?.(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
