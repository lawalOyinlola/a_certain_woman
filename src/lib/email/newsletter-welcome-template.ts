import {
  emailDocument,
  emailFooterText,
  emailStyle,
  eventsUrl,
  linkStyle,
} from "./layout";

export const WELCOME_SUBJECT = "You're on the list | A Certain Woman";

export function newsletterWelcomeHtml(): string {
  const p = `style="${emailStyle.letterParagraph}"`;
  return emailDocument(`<div style="${emailStyle.letter}">
    <p ${p}>Dear friend,</p>
    <p ${p}>Thank you for joining us. Your address is now on our mailing list.</p>
    <p ${p}>Our letters come quietly and not too often: a word of encouragement, news from the sisterhood, and an invitation to the next gathering. Your first one will arrive with our next dispatch.</p>
    <p ${p}>Until then, see what is coming up on our <a href="${eventsUrl}" style="${linkStyle}">events page</a>.</p>
    <p ${p}>With warmth,<br />A Certain Woman</p>
  </div>`);
}

export function newsletterWelcomeText(): string {
  return `Dear friend,

Thank you for joining us. Your address is now on our mailing list.

Our letters come quietly and not too often: a word of encouragement, news from the sisterhood, and an invitation to the next gathering. Your first one will arrive with our next dispatch.

Until then, see what is coming up on our events page:
${eventsUrl}

With warmth,
A Certain Woman

--
${emailFooterText}`;
}
