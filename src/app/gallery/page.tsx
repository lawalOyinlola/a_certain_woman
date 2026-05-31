import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Gallery } from "@/components/sections/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and films from every A Certain Woman gathering: Healed and Held, Faith and Flowers, the Crown Table Spotlight Breakfast, and the women who came. Filter by event.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | A Certain Woman",
    description:
      "Faces, voices, and quiet corners from every ACW gathering. Photos and films you can filter by event.",
    url: "/gallery",
  },
  twitter: {
    title: "Gallery | A Certain Woman",
    description:
      "Photos and films from every ACW gathering. Filter by event.",
  },
};

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="THE GATHERING, IN PICTURES"
          title={
            <>
              The full <em>gallery.</em>
            </>
          }
          sub="Faces, voices, and quiet corners from every gathering of the sisterhood. Filter by the room you were in."
        />
        <Gallery compact />
      </main>
      <Footer />
    </>
  );
}
