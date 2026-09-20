import { useState, type ReactElement } from 'react';
import { seedOrders, type Order } from './data';

export function OrdersPanel(): ReactElement {
  const [orders, setOrders] = useState<Order[]>(seedOrders);

  // Fixed: provide initial value to reduce to handle empty orders array.
  const total = orders.reduce((sum, o) => sum + o.total, 0);

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
