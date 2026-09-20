import { useState, type ReactElement } from 'react';
import { cartItems } from './data';

export function CartPanel(): ReactElement {
  const [qty, setQty] = useState('2'); // <input> values are always strings
  const item = cartItems[0];

  // Convert qty to a number before multiplication to get a correct subtotal.
  const subtotal = item.price * Number(qty);

  return (
    <section className="panel">
      <h2>Cart</h2>
      <p className="panel__hint">Subtotal should be price × quantity, but it is wrong.</p>
      <div className="panel__row">
        <span>{item.name} @ ${item.price}</span>
        <label>
          Qty{' '}
          <input
            type="number"
            min={0}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </label>
      </div>
      <div className="panel__total" data-testid="cart-subtotal">Subtotal: ${subtotal}</div>
    </section>
  );
}
