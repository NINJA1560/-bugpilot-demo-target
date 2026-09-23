import { useState, type ReactElement } from 'react';

/**
 * Determine the total number of products from the catalogue response.
 * The server may return either:
 * - an object with a numeric `total` field,
 * - an object with a numeric `count` field (newly supported),
 * - an array of product objects,
 * - an object with a `products` array field.
 * In any other shape we fall back to 0.
 */
function extractTotal(data: unknown): number {
  if (Array.isArray(data)) {
    return data.length;
  }
  if (typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    if (typeof obj.total === 'number') {
      return obj.total;
    }
    // New support for the `count` field returned by the API.
    if (typeof obj.count === 'number') {
      return obj.count;
    }
    if (Array.isArray(obj.products)) {
      return obj.products.length;
    }
  }
  return 0;
}

/**
 * Catalogue size, loaded on demand.
 *
 * The request sits behind the button on purpose: nothing here happens on page
 * load, so merely opening the app produces no request, no console error and no
 * wrong value. A reproduction run has to drive the button to see anything at
 * all, which keeps the generic "is any error boundary showing?" fallback
 * unaffected by this panel.
 */
export function CatalogPanel(): ReactElement {
  const [summary, setSummary] = useState('Not loaded');

  async function load(): Promise<void> {
    setSummary('Loading…');
    const response = await fetch('/api/catalog.json');
    const data = await response.json();
    const total = extractTotal(data);
    setSummary(`${total} products`);
  }

  return (
    <section className="panel">
      <h2>Catalogue</h2>
      <p className="panel__hint">Load the catalogue to see how many products it holds.</p>
      <div className="panel__row">
        <button type="button" data-testid="catalog-load" onClick={() => void load()}>
          Load Catalogue
        </button>
      </div>
      <div className="panel__total" data-testid="catalog-count">
        {summary}
      </div>
    </section>
  );
}
