import {
  CONTACT_REASONS,
  CONTACT_REASON_SLUGS,
  type ContactReason,
} from "@/config/site";

/**
 * What the contact page says for each reason: its heading, a short
 * description, the question the message step asks, and the send button.
 * `title` is [plain words, emphasised words]; the emphasis is set in the
 * brand's gold italic.
 */
export type ReasonCopy = {
  slug: string;
  label: ContactReason;
  /** Short label for the reason picker. */
  choice: string;
  title: [string, string];
  description: string;
  messageQuestion: string;
  messageHint: string;
  /** Ask for an organisation (optional) on this reason. */
  askOrganisation: boolean;
  submit: string;
  thanks: string;
};

const COPY: Record<ContactReason, Omit<ReasonCopy, "slug" | "label">> = {
  "Join the Movement": {
    choice: "Join the movement",
    title: ["Join the", "movement."],
    description:
      "Tell us a little about yourself, and we will point you to the next gathering, circle or programme that fits where you are.",
    messageQuestion: "What would you like us to know about you?",
    messageHint: "Where you are in life, what drew you here, or what you hope to find.",
    askOrganisation: false,
    submit: "Send my request to join",
    thanks: "We will be in touch about the next gathering.",
  },
  "Attend an Event": {
    choice: "Come to a gathering",
    title: ["Come to a", "gathering."],
    description:
      "Tell us which gathering you would like to come to, and we will send you the details for the day.",
    messageQuestion: "Anything we should know before the day?",
    messageHint: "How many are coming, access needs, or a question about the programme.",
    askOrganisation: false,
    submit: "Tell them I'm coming",
    thanks: "We will send you the details for the day.",
  },
  "Apply to BecomingHER": {
    choice: "Apply to BecomingHER",
    title: ["Becoming", "HER."],
    description:
      "The application for The Crown Circle: twenty places for girls and young women aged 14 to 21 in Freetown. About ten minutes, one question at a time.",
    messageQuestion: "",
    messageHint: "",
    askOrganisation: false,
    submit: "Send my application",
    thanks: "",
  },
  "Partner / Sponsor": {
    choice: "Partner or sponsor",
    title: ["Build it", "with us."],
    description:
      "Churches, schools, companies, NGOs and individuals help us keep our gatherings and programmes free. Tell us what you have in mind.",
    messageQuestion: "How would you like to partner with us?",
    messageHint: "Sponsorship, in-kind support, sharing an opportunity, or a programme you care about.",
    askOrganisation: true,
    submit: "Send partnership enquiry",
    thanks: "Someone from the team will reply to talk it through.",
  },
  Volunteer: {
    choice: "Volunteer my time",
    title: ["Give your", "time."],
    description:
      "Every gathering is carried by women and men who give an afternoon, a skill or a pair of hands. Tell us how you would like to help.",
    messageQuestion: "How would you like to help?",
    messageHint: "Your skills, the days you are free, or the kind of work you enjoy.",
    askOrganisation: false,
    submit: "Offer my time",
    thanks: "We will reply when the next opportunity fits.",
  },
  "Invite ACW": {
    choice: "Invite ACW to speak or collaborate",
    title: ["Invite", "us in."],
    description:
      "We speak at churches, schools and conferences, and collaborate on gatherings with partners who share the work. Tell us about yours.",
    messageQuestion: "Tell us about the invitation.",
    messageHint: "The occasion, the date, the audience, and what you would like from us.",
    askOrganisation: true,
    submit: "Send the invitation",
    thanks: "We will reply about dates and details.",
  },
  "Media Inquiry": {
    choice: "A media enquiry",
    title: ["Tell the", "story."],
    description:
      "For interviews, features and coverage of A Certain Woman. Tell us about the piece and your deadline.",
    messageQuestion: "What is the story, and when is your deadline?",
    messageHint: "The outlet, the angle, and who you would like to speak with.",
    askOrganisation: true,
    submit: "Send media enquiry",
    thanks: "We will reply before your deadline wherever we can.",
  },
  "Share My Story": {
    choice: "Share my story",
    title: ["Your story", "matters."],
    description:
      "Nothing you share here is published without your permission. Write as much or as little as you want.",
    messageQuestion: "What would you like to share?",
    messageHint: "Only what you are comfortable sharing. We will ask before using any of it.",
    askOrganisation: false,
    submit: "Share my story",
    thanks: "Thank you for trusting us with it.",
  },
  "General Inquiry": {
    choice: "Ask a question",
    title: ["Write to", "us."],
    description:
      "Questions, ideas, or a note to say hello. Every message is read by a person.",
    messageQuestion: "How can we help?",
    messageHint: "Tell us a little about why you are writing.",
    askOrganisation: false,
    submit: "Send message",
    thanks: "Someone from our team will reply soon.",
  },
};

export const REASONS: ReasonCopy[] = CONTACT_REASONS.map((label) => ({
  slug: CONTACT_REASON_SLUGS[label],
  label,
  ...COPY[label],
}));

export const BECOMING_HER_SLUG = CONTACT_REASON_SLUGS["Apply to BecomingHER"];

/** The reason selected when someone opens /contact without one in the link. */
export const DEFAULT_REASON = CONTACT_REASON_SLUGS["General Inquiry"];

/**
 * The reasons shown as radio buttons. The rest sit in a dropdown under
 * "Something else", so the first question stays short. A link to any other
 * reason adds that reason to the radios, so it is visible on arrival.
 */
export const PRIMARY_REASONS = ["join", "attend", "partner", "general"];

/** The page's heading before a reason is chosen. */
export const DEFAULT_COPY = {
  title: ["Write to", "us."] as [string, string],
  description:
    "Whether you want to join the movement, come to a gathering, partner with us or share your story, you are welcome here. Start by telling us why you are writing.",
};

/** Accepts a slug ("attend") or, from older links, a label ("Attend an Event"). */
export function findReason(value: string | null | undefined): ReasonCopy | null {
  if (!value) return null;
  const v = value.trim().toLowerCase();
  return (
    REASONS.find((r) => r.slug === v || r.label.toLowerCase() === v) ?? null
  );
}
