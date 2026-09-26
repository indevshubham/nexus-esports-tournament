import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('NEXUS Component Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 my-4 bg-surface/80 border border-white/10 clip-corner-both text-center max-w-xl mx-auto font-mono text-xs text-text-muted">
          <span className="text-accent-cyan font-bold tracking-widest uppercase block mb-1">
            TELEMETRY RECOVERY // COMPONENT SAFEGUARD
          </span>
          <p className="text-text-dim text-[11px] font-sans mb-3">
            A visual sub-component recovered gracefully. All other arena systems remain operational.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3 py-1.5 bg-surface-card border border-white/10 hover:border-accent-cyan text-white text-[10px] uppercase tracking-wider transition-colors"
          >
            REFRESH TELEMETRY
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
