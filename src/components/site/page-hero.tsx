export function PageHero({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <section className="acw-page-hero">
      <div className="text-[11px] uppercase tracking-[0.32em] text-gold mb-9">
        <span>·&nbsp;&nbsp;{eyebrow}&nbsp;&nbsp;·</span>
      </div>
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </section>
  );
}
