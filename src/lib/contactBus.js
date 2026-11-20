/** Lets any CTA pre-fill the contact form, then jump to it.
    The detail is also kept as "pending" so it survives a route change
    (e.g. clicking "Request a quote" on /services, which lands on the home page). */
export const PREFILL = 'contact:prefill';
let pending = null;

export function prefillContact(detail) {
  pending = detail;
  window.dispatchEvent(new CustomEvent(PREFILL, { detail }));
}

export function takePendingPrefill() {
  const d = pending;
  pending = null;
  return d;
}
