export function Welcome() {
  return (
    <section
      id="welcome"
      className="acw-bg-cream relative px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
        <div className="acw-section-label">
          <span className="acw-num">I.</span>
          <span>Welcome</span>
        </div>

        <h2 className="acw-display acw-display--center mt-6">
          Welcome to
          <br />
          <em>A Certain Woman.</em>
        </h2>

        <div className="mt-12 flex max-w-[720px] flex-col gap-5 text-[17px] leading-[1.75] text-ink-2">
          <p>
            A Certain Woman was birthed as more than an organization. It is a
            movement of restoration, dignity, faith, healing, and becoming.
          </p>
          <p>
            We believe every woman carries a crown — not because life has been
            easy, but because purpose still speaks over her story. Through
            sacred gatherings, leadership platforms, mentorship, wellness
            experiences, advocacy, and community-based initiatives, ACW creates
            spaces where women can breathe again, believe again, rise again,
            and lead again.
          </p>
          <p>
            Here, women are not defined by pain, delay, silence, survival, or
            past seasons. Here, women are reminded that they are seen by God,
            strengthened by grace, and called into purpose.
          </p>
        </div>

        {/* Declaration */}
        <div className="mt-20 flex flex-col items-center gap-7">
          <span className="acw-decl-rule" />
          <p className="acw-declaration-quote">
            This is where <em>hearts</em> are restored.
            <br />
            This is where <em>crowns</em> are reclaimed.
          </p>
          <span className="acw-decl-rule" />
        </div>
      </div>
    </section>
  );
}
