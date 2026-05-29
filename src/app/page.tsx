import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { Welcome } from "@/components/sections/welcome";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { Pillars } from "@/components/sections/pillars";
import { Experiences } from "@/components/sections/experiences";
import { MenWhoStand } from "@/components/sections/men-who-stand";
import { Manifesto } from "@/components/sections/manifesto";
import { Founder } from "@/components/sections/founder";
import { Events } from "@/components/sections/events";
import { StoriesPreview } from "@/components/sections/stories";
import { Anthem } from "@/components/sections/anthem";
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
        <Welcome />
        <WhoWeServe />
        <Pillars />
        <Experiences />
        <MenWhoStand />
        <Manifesto />
        <Founder />
        <Events />
        <StoriesPreview />
        <Anthem />
        <Join />
      </main>
      <Footer />
    </>
  );
}
