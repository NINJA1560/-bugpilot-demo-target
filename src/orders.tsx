import { useState, type ReactElement } from 'react';
import { seedOrders, type Order } from './data';

export function OrdersPanel(): ReactElement {
  const [orders, setOrders] = useState<Order[]>(seedOrders);

  // BUG #2: reduce with no initial value throws "Reduce of empty array with no
  // initial value" the moment the order list is cleared.
  const total = orders.map((o) => o.total).reduce((a, b) => a + b);

  return (
    <section className="panel">
      <h2>Orders</h2>
      <p className="panel__hint">Click “Clear Orders” and the total crashes.</p>
      <div className="panel__row">
        <button type="button" onClick={() => setOrders([])}>Clear Orders</button>
        <button type="button" onClick={() => setOrders(seedOrders)}>Reset Orders</button>
      </div>
      <ul className="panel__list">
        {orders.map((o) => (
          <li key={o.id}>Order #{o.id}: ${o.total}</li>
        ))}
      </ul>
      <div className="panel__total">Total: ${total}</div>
    </section>
  );
}
