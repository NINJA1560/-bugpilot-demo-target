import { useState, type ReactElement } from 'react';
import { customers, type Customer } from './data';

function CustomerCard({ customer }: { customer: Customer }): ReactElement {
  return (
    <div className="card">
      {customer.profile && (
        <div className="card__name">
          <strong>{customer.profile.fullName}</strong> · <span>{customer.profile.tier}</span>
        </div>
      )}
      <div className="card__email">{customer.email}</div>
    </div>
  );
}

export function CustomersPanel(): ReactElement {
  const [selectedId, setSelectedId] = useState<number>(customers[0].id);
  const [loaded, setLoaded] = useState<Customer | null>(null);

  return (
    <section className="panel">
      <h2>Customers</h2>
      <p className="panel__hint">Pick a customer, then click “Load Customer”.</p>
      <div className="panel__row">
        <select
          aria-label="Customer"
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
        >
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              #{c.id} — {c.email}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setLoaded(customers.find((c) => c.id === selectedId) ?? null)}
        >
          Load Customer
        </button>
      </div>
      {loaded && <CustomerCard customer={loaded} />}
    </section>
  );
}
