import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Join } from "@/components/sections/join";
import { Faq } from "@/components/sections/faq";
import { ContactForm } from "./contact-form";
import { contact, socials, mailtoHref } from "@/config/site";

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

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with A Certain Woman in Freetown, Sierra Leone. Write to join the movement, partner with us, attend an event, invite ACW to collaborate, or share your story.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | A Certain Woman",
    description:
      "Write to A Certain Woman in Freetown, Sierra Leone. Join the movement, partner with us, attend an event, or share your story.",
    url: "/contact",
  },
  twitter: {
    title: "Contact | A Certain Woman",
    description:
      "Write to ACW in Freetown, Sierra Leone. Join, partner, attend, or share.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="CONTACT US  ·  WE'D LOVE TO HEAR FROM YOU"
          title={
            <>
              Write to <em>us.</em>
            </>
          }
          sub="Whether you want to join the movement, partner with us, invite ACW to collaborate, support an outreach, attend an event, or share your story, you are welcome here."
        />
        {/* Form first: most visitors who reach this page have already decided
            to write, so we lead with the form (and WhatsApp), FAQ follows. The
            #write anchor lets CTAs across the site deep-link straight here. */}
        <section
          id="write"
          className="scroll-mt-28 bg-cream-1 px-6 py-24 md:px-12 md:py-28"
        >
          <div className="mx-auto max-w-[1120px]">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>

            <div className="acw-contact-info">
              <div>
                <small>LOCATION</small>
                <span>{contact.location}</span>
              </div>
              <div>
                <small>EMAIL</small>
                <span>
                  <a
                    href={mailtoHref}
                    className="text-forest transition-colors hover:text-gold"
                  >
                    {contact.email}
                  </a>
                </span>
              </div>
              <div>
                <small>PHONE / WHATSAPP</small>
                <span>
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest transition-colors hover:text-gold"
                    aria-label={`Message A Certain Woman on WhatsApp at ${contact.phoneDisplay} (opens in a new tab)`}
                  >
                    {contact.phoneDisplay}
                  </a>
                </span>
              </div>
              <div>
                <small>SOCIAL</small>
                <span>
                  <a
                    href={socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="text-forest transition-colors hover:text-gold"
                    aria-label={`A Certain Woman on Instagram, ${socials.instagram.handle} (opens in a new tab)`}
                  >
                    {socials.instagram.handle}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>

        <Faq
          className="bg-cream-2"
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

        {/* Newsletter only: visitors here are already writing, so the onward
            pathway cards (which would link back to contact) are dropped. */}
        <Join withLabel={false} paths={[]} />
      </main>
      <Footer />
    </>
  );
}
