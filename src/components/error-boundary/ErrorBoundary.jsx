import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ErrorBoundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || "An unexpected error occurred"}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
