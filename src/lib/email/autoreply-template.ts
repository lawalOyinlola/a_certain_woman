import { escapeHtml as esc } from "./escape";
import {
  emailDocument,
  emailFooterText,
  emailStyle,
  eventsUrl,
  linkStyle,
} from "./layout";

type AutoReply = { name: string; reason: string };

export const AUTOREPLY_SUBJECT = "We received your message | A Certain Woman";

export function autoReplyHtml({ name, reason }: AutoReply): string {
  const p = `style="${emailStyle.letterParagraph}"`;
  return emailDocument(`<div style="${emailStyle.letter}">
    <p ${p}>Dear ${esc(name)},</p>
    <p ${p}>We received your message about <strong>${esc(reason)}</strong>. A member of our team will reply to you shortly.</p>
    <p ${p}>This note was sent automatically, but replies to it reach a real person, so write back if there is anything you would like to add.</p>
    <p ${p}>In the meantime, see our upcoming gatherings on the <a href="${eventsUrl}" style="${linkStyle}">events page</a>.</p>
    <p ${p}>With warmth,<br />A Certain Woman</p>
  </div>`);
}

export function autoReplyText({ name, reason }: AutoReply): string {
  return `Dear ${name},

We received your message about ${reason}. A member of our team will reply to you shortly.

This note was sent automatically, but replies to it reach a real person, so write back if there is anything you would like to add.

In the meantime, see our upcoming gatherings on the events page:
${eventsUrl}

With warmth,
A Certain Woman

--
${emailFooterText}`;
}
