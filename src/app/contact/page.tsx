import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Faq } from "@/components/sections/faq";
import { getUpcomingEvents } from "@/lib/data/events";
import { applicationsDryRun, applicationsOverride } from "@/lib/data/becoming-her";
import { BECOMING_HER_SLUG, findReason } from "@/lib/contact/reasons";
import { ContactFlow, type EventSummary } from "./contact-flow";

const FAQS = [
  {
    q: "How can I contact A Certain Woman?",
    a: "You can reach A Certain Woman by email at info@acertainwoman.org, by phone or WhatsApp on +232 79 609125, or by filling in the contact form on this page. We are based in Freetown, Sierra Leone.",
  },
  {
    q: "Where is A Certain Woman located?",
    a: "A Certain Woman is based in Freetown, Sierra Leone, and serves women and girls across Sierra Leone and the wider West Africa region.",
  },
  {
    q: "How do I join the movement?",
    a: "Write to us through the contact form or by email, message us on WhatsApp, or follow us on Instagram and TikTok at @a__certain__woman. Every woman is welcome, so tell us a little about yourself and we will guide you to the next gathering or programme.",
  },
  {
    q: "What is the fastest way to get a response?",
    a: "WhatsApp on +232 79 609125 is usually the quickest way to reach us. You can also email info@acertainwoman.org and we will respond as soon as we can.",
  },
  {
    q: "Can I invite A Certain Woman to speak, collaborate, or partner?",
    a: "Yes. We welcome invitations to speak, collaborate on events, and partner with churches, companies, NGOs, and community leaders. Send us a message through the contact form or email and we will follow up.",
  },
];

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? null;

const BASE_DESCRIPTION =
  "Get in touch with A Certain Woman in Freetown, Sierra Leone. Write to join the movement, come to a gathering, partner with us, invite ACW, or share your story.";

/**
 * A shared link names its purpose (`?reason=becoming-her`), so its preview on
 * WhatsApp or social media says what the link is for. The canonical address
 * stays /contact.
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const reason = findReason(one((await searchParams).reason));

  const title =
    reason?.slug === BECOMING_HER_SLUG
      ? "Apply to BecomingHER"
      : reason
        ? `${reason.title.join(" ").replace(/\.$/, "")}`
        : "Contact";
  const description =
    reason?.slug === BECOMING_HER_SLUG
      ? "Apply for one of twenty places in BecomingHER: The Crown Circle, a free mentorship programme for girls and young women aged 14 to 21 in Freetown."
      : (reason?.description ?? BASE_DESCRIPTION);
  const url = reason ? `/contact?reason=${reason.slug}` : "/contact";

  return {
    title,
    description,
    alternates: { canonical: "/contact" },
    openGraph: { title: `${title} | A Certain Woman`, description, url },
    twitter: { title: `${title} | A Certain Woman`, description },
  };
}

/** Rounded to the minute, matching the browser clock in becoming-her/live. */
function renderMinute(): number {
  return Math.floor(Date.now() / 60_000) * 60_000;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const events: EventSummary[] = getUpcomingEvents().map((e) => ({
    id: e.id,
    title: e.title,
    subtitle: e.subtitle,
    date: e.date,
    place: e.venue ? `${e.venue}, ${e.location}` : e.location,
    cover: e.cover,
  }));

  return (
    <>
      <Nav />
      <main id="top">
        <ContactFlow
          initialReason={one(sp.reason)}
          initialEvent={one(sp.event)}
          prefill={(one(sp.prefill) ?? "").slice(0, 600)}
          events={events}
          serverNow={renderMinute()}
          override={applicationsOverride()}
          testMode={applicationsDryRun()}
        />

        <Faq
          className="bg-cream-1"
          label="Common questions"
          heading={
            <>
              Before you
              <br />
              <em>write.</em>
            </>
          }
          items={FAQS}
        />
      </main>
      <Footer />
    </>
  );
}
