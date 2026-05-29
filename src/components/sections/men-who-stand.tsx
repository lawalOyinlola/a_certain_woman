import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";

const MEN = {
  num: "06",
  eyebrow: "Male engagement",
  sub: "Restoring Strength. Redefining Manhood. Building Legacy.",
  blurb:
    "ACW's male engagement program, encouraging responsible leadership, fatherhood, accountability, protection without control, emotional maturity, faith, and legacy-building.",
  pull: "Women's restoration and family wellbeing are strengthened when men also rise in responsibility, healing, and purpose.",
  features: [
    "Responsible fatherhood",
    "Positive masculinity",
    "Family leadership",
    "Emotional maturity",
    "Community mentorship",
    "Faith and accountability",
    "Protection and dignity",
    "Legacy-building",
  ],
};

export function MenWhoStand({ withLabel = true }: { withLabel?: boolean }) {
  return (
    <section
      id="men-who-stand"
      className="bg-cream-2 px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1120px]">
        {withLabel && (
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="acw-section-label">
              <span className="acw-num">{MEN.num}.</span>
              <span>{MEN.eyebrow}</span>
            </div>
            <h2 className="acw-display acw-display--center mt-6">
              Men who <em>stand.</em>
            </h2>
            <p className="mt-5 max-w-[560px] font-display text-[18px] italic text-muted-foreground">
              {MEN.sub}
            </p>
          </div>
        )}

        <div className="acw-twoup">
          <div className="acw-twoup-body">
            <p className="text-[17px] text-ink-2">{MEN.blurb}</p>
            <p className="font-display text-[18px] italic text-muted-foreground">
              {MEN.pull}
            </p>
            <Button
              asChild
              variant="editorial"
              size="pill"
              className="mt-4 w-fit"
            >
              <Link href="/contact">
                Learn about Men Who Stand <ArrowRight />
              </Link>
            </Button>
          </div>
          <div>
            <small className="acw-section-label-mini">KEY FEATURES</small>
            <ul className="acw-checklist mt-6">
              {MEN.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
