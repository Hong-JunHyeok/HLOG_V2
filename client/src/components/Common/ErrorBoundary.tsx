import React from 'react';

interface ErrorBoundaryPropType {
  fallback: React.ReactNode,
  children: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryPropType> {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log(error);
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
