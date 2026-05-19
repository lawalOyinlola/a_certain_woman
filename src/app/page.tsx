import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Pillars } from "@/components/sections/pillars";
import { Quotes } from "@/components/sections/quotes";
import { Manifesto } from "@/components/sections/manifesto";
import { Events } from "@/components/sections/events";
import { Gallery } from "@/components/sections/gallery";
import { Join } from "@/components/sections/join";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Pillars />
        <Quotes />
        <Manifesto />
        <Events />
        <Gallery />
        <Join />
      </main>
      <Footer />
    </>
  );
}