import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Wraps each demo panel so a thrown bug is contained and displayed (rather than
 * blanking the whole SPA), and so Playwright can assert on the surfaced error
 * in later phases.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(`[${this.props.label}]`, error.message, info.componentStack);
  }

  private readonly reset = (): void => {
    this.setState({ error: null });
  };

  override render(): ReactNode {
    const { error } = this.state;
    if (error) {
      return (
        <div className="panel panel--error" role="alert" data-testid={`error-${this.props.label}`}>
          <strong>Something broke in “{this.props.label}”.</strong>
          <pre className="panel__error-msg">{error.message}</pre>
          <button type="button" onClick={this.reset}>Reset panel</button>
        </div>
      );
    }
    return this.props.children;
  }
}
