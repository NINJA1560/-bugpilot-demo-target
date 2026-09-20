import { useState, type ReactElement } from 'react';
import { cartItems, coupons } from './data';

const SUBTOTAL = cartItems.reduce((sum, item) => sum + item.price, 0);

export function CheckoutPanel(): ReactElement {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<string | null>(null);

  // Use a case‑insensitive lookup and default to 0% off when the coupon is missing.
  const appliedCode = (applied ?? '').toLowerCase();
  const percentOff = coupons[appliedCode]?.percentOff ?? 0;
  const discount = applied === null ? 0 : (SUBTOTAL * percentOff) / 100;
  const total = SUBTOTAL - discount;

  return (
    <section className="panel">
      <h2>Checkout</h2>
      <p className="panel__hint">
        Apply coupon “save10”. The total should drop to $22.04, but it does not.
      </p>
      <div className="panel__row">
        <label>
          Coupon{' '}
          <input
            data-testid="coupon-input"
            value={code}
            placeholder="save10"
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <button type="button" data-testid="apply-coupon" onClick={() => setApplied(code)}>
          Apply Coupon
        </button>
      </div>
      <div className="panel__row">Subtotal: ${SUBTOTAL.toFixed(2)}</div>
      <div className="panel__total" data-testid="checkout-total">
        Total: ${total.toFixed(2)}
      </div>
    </section>
  );
}
