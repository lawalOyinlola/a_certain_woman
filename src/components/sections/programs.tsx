import { WomenPrograms } from "./women-programs";
import { MenWhoStand } from "./men-who-stand";

/**
 * The full Programs section: the women's signature programs (tabs on the home
 * page, stacked on /programs) followed by Men Who Stand. Composed here so pages
 * render one `<Programs>` instead of wiring the two pieces together.
 */
export function Programs({
  withLabel = true,
  layout = "tabs",
  withDevotional = false,
}: {
  withLabel?: boolean;
  layout?: "tabs" | "stacked";
  /** Show the full Men Who Stand devotional (used on /programs, not home). */
  withDevotional?: boolean;
}) {
  return (
    <>
      <WomenPrograms withLabel={withLabel} layout={layout} />
      <MenWhoStand withDevotional={withDevotional} />
    </>
  );
}
