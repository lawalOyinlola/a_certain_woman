/**
 * Escapes a value for use in HTML text or a quoted attribute. Every user
 * supplied value that reaches an email template goes through this, so the
 * markup of the email cannot be changed by a form submission.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
