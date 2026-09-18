import { useState, type ReactElement } from 'react';
import { fakeFetch } from './data';

export function ApiPanel(): ReactElement {
  const [status, setStatus] = useState<string>('idle');

  async function loadProduct(id: number): Promise<void> {
    const res = await fakeFetch(id);
    // BUG #4: no `res.ok` check. On a 404 the body has no `name`, so the UI
    // silently shows "Loaded: undefined" instead of reporting the error.
    const product = await res.json();
    setStatus(`Loaded: ${product.name}`);
  }

  return (
    <section className="panel">
      <h2>API</h2>
      <p className="panel__hint">“Fetch Missing” 404s but is reported as a successful load.</p>
      <div className="panel__row">
        <button type="button" onClick={() => void loadProduct(1)}>Fetch Product #1</button>
        <button type="button" onClick={() => void loadProduct(999)}>Fetch Missing (#999)</button>
      </div>
      <div className="panel__status" data-testid="api-status">{status}</div>
    </section>
  );
}
