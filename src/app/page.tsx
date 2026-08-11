import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { Manifesto } from "@/components/sections/manifesto";
import { Founder } from "@/components/sections/founder";
import { Impact } from "@/components/sections/impact";
import { Anthem } from "@/components/sections/anthem";
import { Events } from "@/components/sections/events";
import { Join } from "@/components/sections/join";

// Revalidate hourly so date-driven UI (Men Who Stand badge, upcoming/past
// event split) stays current without a full rebuild.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <WhoWeServe />
        <Manifesto />
        <Impact />
        <Founder />
        <Anthem />
        {/* Sits directly above the invitation so "there is a place for you"
            follows something concrete. The announcement banner is dismissible
            and per-event, so without this the next gathering has no lasting
            presence on the home page. Falls back to the archive when nothing
            is upcoming, and renders nothing when there are no events at all. */}
        <Events />
        <Join />
      </main>
      <Footer />
    </>
  );
}
