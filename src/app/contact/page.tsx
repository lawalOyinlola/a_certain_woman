import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Join } from "@/components/sections/join";
import { ContactForm } from "./contact-form";
import { contact, socials, mailtoHref } from "@/config/site";

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

        <section className="bg-cream-1 px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1120px]">
            <ContactForm />

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

        <Join withLabel={false} />
      </main>
      <Footer />
    </>
  );
}
