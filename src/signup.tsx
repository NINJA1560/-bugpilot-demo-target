import { useState, type ReactElement } from 'react';

/** Accepted address shape for the newsletter form. */
const EMAIL_PATTERN = /^[a-zA-Z0-9._+\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

export function SignupPanel(): ReactElement {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  function submit(): void {
    if (!EMAIL_PATTERN.test(email)) {
      setError('Please enter a valid email address.');
      setStatus('');
      return;
    }
    setError('');
    setStatus(`Subscribed ${email}`);
  }

  return (
    <section className="panel">
      <h2>Newsletter</h2>
      <p className="panel__hint">Subscribe with your email address.</p>
      <div className="panel__row">
        <label>
          Email{' '}
          <input
            data-testid="signup-email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="button" data-testid="signup-submit" onClick={submit}>
          Subscribe
        </button>
      </div>
      {error && (
        <div className="panel__status" data-testid="signup-error">
          {error}
        </div>
      )}
      {status && (
        <div className="panel__status" data-testid="signup-status">
          {status}
        </div>
      )}
    </section>
  );
}
