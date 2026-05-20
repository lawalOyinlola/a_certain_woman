import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Gallery } from "@/components/sections/gallery";

export const metadata = {
  title: "Gallery — A Certain Woman",
  description: "The gathering, in pictures.",
};

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 md:pt-40">
        <header className="mx-auto max-w-[1100px] px-6 text-center md:px-12">
          <div className="acw-section-label justify-center">
            <span className="acw-num">VI.</span>
            <span>The gathering, in pictures</span>
          </div>
          <h1 className="acw-display acw-display--center mt-6">
            The full <em>gallery.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.8] text-muted-foreground">
            Faces, voices, and quiet corners from every gathering of the
            sisterhood.
          </p>
        </header>
        <Gallery compact />
      </main>
      <Footer />
    </>
  );
}