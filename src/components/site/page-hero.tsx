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
      <div className="acw-rise acw-rise-delay-1 text-[11px] uppercase tracking-[0.32em] text-gold mb-9">
        <span>·&nbsp;&nbsp;{eyebrow}&nbsp;&nbsp;·</span>
      </div>
      <h1 className="acw-rise acw-rise-delay-2">{title}</h1>
      {sub && <p className="acw-rise acw-rise-delay-3">{sub}</p>}
    </section>
  );
}
