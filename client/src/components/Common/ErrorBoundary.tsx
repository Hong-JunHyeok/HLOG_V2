import React from 'react';

interface ErrorBoundaryPropType {
  fallback: React.ReactChild,
  children: React.ReactChild
}

class ErrorBoundary extends React.Component<ErrorBoundaryPropType> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;
    if (hasError) {
      return fallback;
    }
    return children;
  }
}

export default ErrorBoundary;
