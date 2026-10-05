import { useState, type ReactElement } from 'react';

/** Splits a bill evenly between people. */
export function SplitPanel(): ReactElement {
  const [amount, setAmount] = useState('100.50');
  const [people, setPeople] = useState('3');

  const headcount = Math.max(1, parseInt(people, 10) || 1);
  // Use parseFloat to preserve decimal cents when splitting the bill.
  const perPerson = parseFloat(amount) / headcount;

  return (
    <section className="panel">
      <h2>Split the Bill</h2>
      <p className="panel__hint">Divide a bill evenly between people.</p>
      <div className="panel__row">
        <label>
          Bill{' '}
          <input
            data-testid="split-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          People{' '}
          <input
            data-testid="split-people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </label>
      </div>
      <div className="panel__total" data-testid="split-per-person">
        Each pays: ${perPerson.toFixed(2)}
      </div>
    </section>
  );
}
