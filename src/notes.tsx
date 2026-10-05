import { useCallback, useState, type ReactElement } from 'react';

/** Scratch notes with a save button. */
export function NotesPanel(): ReactElement {
  const [draft, setDraft] = useState('');
  const [saved, setSaved] = useState('');

  const save = useCallback(() => {
    setSaved(draft);
  }, [draft]);

  return (
    <section className="panel">
      <h2>Notes</h2>
      <p className="panel__hint">Write a note and save it.</p>
      <div className="panel__row">
        <label>
          Note{' '}
          <input
            data-testid="notes-draft"
            value={draft}
            placeholder="Remember to…"
            onChange={(e) => setDraft(e.target.value)}
          />
        </label>
        <button type="button" data-testid="notes-save" onClick={save}>
          Save Note
        </button>
      </div>
      <div className="panel__status" data-testid="notes-saved">
        Saved: {saved || '(nothing yet)'}
      </div>
    </section>
  );
}
