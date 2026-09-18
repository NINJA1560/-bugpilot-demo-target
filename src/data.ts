/**
 * In-memory data + a fake API for the demo app. Types here intentionally
 * describe the *contract* the UI trusts; some runtime values violate that
 * contract, which is what produces the demo bugs.
 */

export interface CustomerProfile {
  fullName: string;
  tier: 'gold' | 'silver' | 'bronze';
}

export interface Customer {
  id: number;
  email: string;
  /** The contract says every customer has a profile... */
  profile: CustomerProfile;
}

/**
 * Data as it "arrives from the backend": typed by assertion, exactly like the
 * result of a `fetch()`. Customer #2 is missing `profile` — a real-world
 * contract violation the typed UI does not expect. This is what makes BUG #1
 * a genuine runtime TypeError that still passes `tsc`.
 */
const rawCustomers: unknown = [
  { id: 1, email: 'ada@bugpilot.dev', profile: { fullName: 'Ada Lovelace', tier: 'gold' } },
  { id: 2, email: 'no-profile@bugpilot.dev' },
  { id: 3, email: 'grace@bugpilot.dev', profile: { fullName: 'Grace Hopper', tier: 'silver' } },
];

export const customers = rawCustomers as Customer[];

export interface Order {
  id: number;
  total: number;
}

export const seedOrders: Order[] = [
  { id: 101, total: 42 },
  { id: 102, total: 18 },
];

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export const cartItems: CartItem[] = [
  { id: 1, name: 'Widget', price: 9.99 },
  { id: 2, name: 'Gadget', price: 14.5 },
];

export interface Product {
  id: number;
  name: string;
}

export interface FakeResponse {
  ok: boolean;
  status: number;
  json: () => Promise<Product>;
}

/** Fake fetch: ids 1..100 exist, anything else 404s with an empty body. */
export function fakeFetch(id: number): Promise<FakeResponse> {
  const exists = id >= 1 && id <= 100;
  return Promise.resolve({
    ok: exists,
    status: exists ? 200 : 404,
    // On 404 the body has no `name` — modelled as an empty object cast to the
    // success type, mirroring an API whose error envelope the caller ignores.
    json: (): Promise<Product> =>
      Promise.resolve(exists ? { id, name: `Product #${id}` } : ({} as Product)),
  });
}
