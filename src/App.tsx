import { useEffect, useState, type ReactElement } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { CustomersPanel } from './customers';
import { OrdersPanel } from './orders';
import { CartPanel } from './cart';
import { ApiPanel } from './api';

function BuggyCounter(): ReactElement {
  const [count, setCount] = useState(0);
  // BUG #5: missing dependency array -> the effect runs after every render and
  // schedules another render -> "Maximum update depth exceeded" (infinite loop).
  useEffect(() => {
    setCount((c) => c + 1);
  }, []);
  return <div className="panel__total">Render count: {count}</div>;
}

export function App(): ReactElement {
  const [showCounter, setShowCounter] = useState(false);

  return (
    <main className="app">
      <header className="app__header">
        <h1>BugPilot Demo App</h1>
        <p>Five intentional bugs. Point BugPilot at one to get a verified fix.</p>
      </header>

      <ErrorBoundary label="customers"><CustomersPanel /></ErrorBoundary>
      <ErrorBoundary label="orders"><OrdersPanel /></ErrorBoundary>
      <ErrorBoundary label="cart"><CartPanel /></ErrorBoundary>
      <ErrorBoundary label="api"><ApiPanel /></ErrorBoundary>

      <section className="panel">
        <h2>Live Counter</h2>
        <p className="panel__hint">
          Bug #5 is an infinite render loop, so it is gated behind this toggle to keep the app usable.
        </p>
        <label className="panel__row">
          <input
            type="checkbox"
            checked={showCounter}
            onChange={(e) => setShowCounter(e.target.checked)}
          />
          Enable buggy counter (infinite loop)
        </label>
        {showCounter && (
          <ErrorBoundary label="counter"><BuggyCounter /></ErrorBoundary>
        )}
      </section>
    </main>
  );
}
