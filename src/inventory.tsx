import { useState, type ReactElement } from 'react';

interface InventoryResponse {
  items?: Array<{ sku: string; count: number }>;
}

/** Loads the warehouse feed and summarises it. */
export function InventoryPanel(): ReactElement {
  const [summary, setSummary] = useState('idle');

  async function load(): Promise<void> {
    setSummary('Loading…');
    try {
      const response = await fetch('/api/inventory.json');
      const data = (await response.json()) as InventoryResponse;
      const items = data.items ?? [];
      const total = items.reduce((sum, item) => sum + item.count, 0);
      setSummary(`${items.length} SKUs, ${total} units in stock`);
    } catch (e) {
      setSummary('Error loading inventory');
    }
  }

  return (
    <section className="panel">
      <h2>Inventory</h2>
      <p className="panel__hint">Load the warehouse feed to see stock levels.</p>
      <div className="panel__row">
        <button type="button" data-testid="inventory-load" onClick={() => void load()}>
          Load Inventory
        </button>
      </div>
      <div className="panel__status" data-testid="inventory-summary">
        {summary}
      </div>
    </section>
  );
}
