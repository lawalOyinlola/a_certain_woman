import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Join } from "@/components/sections/join";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to A Certain Woman — to join the movement, partner with us, attend an event, or share your story.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="CONTACT  ·  WE'D LOVE TO HEAR FROM YOU"
          title={
            <>
              Write to <em>us.</em>
            </>
          }
          sub="Whether you want to join the movement, partner with us, invite ACW to collaborate, support an outreach, attend an event, or share your story — you are welcome here."
        />

        <section className="bg-cream-1 px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1120px]">
            <ContactForm />

            <div className="acw-contact-info">
              <div>
                <small>LOCATION</small>
                <span>Freetown, Sierra Leone</span>
              </div>
              <div>
                <small>EMAIL</small>
                <span>info@acertainwoman.org</span>
              </div>
              <div>
                <small>WHATSAPP</small>
                <span>+232 — — —</span>
              </div>
              <div>
                <small>SOCIAL</small>
                <span>@acertainwoman</span>
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
