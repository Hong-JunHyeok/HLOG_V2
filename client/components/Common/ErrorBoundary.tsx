import React from 'react';

interface ErrorBoundaryPropType {
  fallback: React.ReactChild
}

class ErrorBoundary extends React.Component<ErrorBoundaryPropType> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error
    };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary
