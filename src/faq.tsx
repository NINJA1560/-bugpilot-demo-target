import { useState, type ReactElement } from 'react';
import { faqs } from './data';

/** Accordion of frequently asked questions. Internal entries are not shown. */
export function FaqPanel(): ReactElement {
  const [open, setOpen] = useState<number | null>(null);
  const visible = faqs.filter((faq) => !faq.internal);

  return (
    <section className="panel">
      <h2>FAQ</h2>
      <p className="panel__hint">Open a question to read its answer.</p>
      <div className="panel__list">
        {visible.map((faq, index) => (
          <button
            key={faq.q}
            type="button"
            data-testid={`faq-question-${index}`}
            onClick={() => setOpen(index)}
          >
            {faq.q}
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="panel__total" data-testid="faq-answer">
          {visible[open].a}
        </div>
      )}
    </section>
  );
}
