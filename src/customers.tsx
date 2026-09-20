import { useState, type ReactElement } from 'react';
import { customers, type Customer } from './data';

function CustomerCard({ customer }: { customer: Customer }): ReactElement {
  // Safely handle customers without a profile.
  const name = customer.profile?.fullName ?? 'Unnamed Customer';
  const tier = customer.profile?.tier ?? 'N/A';
  return (
    <div className="card">
      <div className="card__name">
        <strong>{name}</strong> · <span>{tier}</span>
      </div>
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
      <p className="panel__hint">Pick customer #2, then click “Load Customer” to trigger the demo bug.</p>
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
