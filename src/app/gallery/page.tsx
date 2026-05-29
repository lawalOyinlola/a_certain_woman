import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
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
      <main className="pt-32 md:pt-40">
        <header className="mx-auto max-w-[1100px] px-6 text-center md:px-12">
          <div className="acw-section-label justify-center">
            <span className="acw-num">IX.</span>
            <span>The gathering, in pictures</span>
          </div>
          <h1 className="acw-display acw-display--center mt-6">
            The full <em>gallery.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.8] text-muted-foreground">
            Faces, voices, and quiet corners from every gathering of the
            sisterhood. Filter by the room you were in.
          </p>
        </header>
        <Gallery compact />
      </main>
      <Footer />
    </>
  );
}
