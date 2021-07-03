import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component<any, any> {
    constructor(props : any) {
        super(props);
        this.state = { eventId: null, hasError : false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error : any, errorInfo : any) {
      Sentry.withScope((scope : any) => {
          scope.setExtras(errorInfo);
          const eventId = Sentry.captureException(error);
          this.setState({eventId});
      });
    }

    render() {
        if (this.state.hasError) {
            return (
              <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;