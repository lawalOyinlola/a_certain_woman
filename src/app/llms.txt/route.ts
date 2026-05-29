import {
  EVENTS,
  getPastEvents,
  getUpcomingEvents,
} from "@/lib/data/events";

export const dynamic = "force-static";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://acertainwoman.org";

function eventLine(e: (typeof EVENTS)[number]) {
  const place = e.venue ? `${e.venue}, ${e.location}` : e.location;
  return `- [${e.title}: ${e.subtitle}](${siteUrl}/events#${e.id}) (${e.date}, ${place}): ${e.blurb}`;
}

function buildContent() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return `# A Certain Woman

> A Certain Woman (ACW) is a faith-rooted movement based in Freetown, Sierra Leone. Founded by Namaari Inanna Kargbo, ACW centers the restoration of women and engages the men, families, mentors, allies, and communities who shape their lives. The work is for women, with everyone. It is built on the conviction that when every person is whole, the need for gender-based initiatives quietly falls away. Tagline: Restoring Hearts. Reclaiming Crowns.

## About

- Founded: 14 February 2026 in Freetown, Sierra Leone
- Founder & Custodian: Namaari Inanna Kargbo
- Tagline: Restoring Hearts. Reclaiming Crowns.
- Type: Faith-rooted non-profit movement, women-centered, community-engaged
- Who it's for: women in every season (healing, rising, leading, becoming); men who stand with them; families, churches, and communities walking alongside
- Long view: a world where every person is healed, honored, and whole, and where gender-based initiatives are no longer needed
- Area served: Sierra Leone and West Africa
- Email: info@acertainwoman.org
- Website: ${siteUrl}

## Pillars of transformation

1. Identity Restoration: helping women rediscover who they are beyond pain, labels, shame, and societal expectations.
2. Emotional Healing & Wellness: faith-sensitive spaces for reflection, sisterhood, rest, and renewal.
3. Leadership & Empowerment: equipping women to lead with wisdom, voice, and purpose.
4. Faith & Spiritual Formation: anchoring women in prayer, scripture, and spiritual strength.
5. Community Impact & Advocacy: partnering with families, churches, and institutions for women's dignity and family wellbeing.

## Signature programs

All programs below are run by A Certain Woman.

- [Identity Academy](${siteUrl}/programs): a structured pathway for healing, identity, confidence, and leadership for women and girls.
- [Faith & Flowers](${siteUrl}/programs): a sacred wellness brunch experience for rest, reflection, and renewal.
- [Crown Table Spotlight Breakfast](${siteUrl}/programs): an invitation-only leadership and recognition experience honoring women of impact, legacy, and purpose.
- [Women's Healing Circles](${siteUrl}/programs): safe spaces for reflection, prayer, release, and restoration.
- [Community Outreach](${siteUrl}/programs): compassion-led initiatives supporting vulnerable women, mothers, girls, and families.
- [Men Who Stand](${siteUrl}/programs): the male engagement program within A Certain Woman, for responsible fatherhood, positive masculinity, family leadership, and legacy-building. Built on the conviction that women's restoration and family wellbeing are strengthened when men also rise in responsibility, healing, and purpose.

## Upcoming events

${upcoming.length === 0 ? "_The calendar is quiet for now. Check back soon._" : upcoming.map(eventLine).join("\n")}

## Past events

${past.length === 0 ? "_No past events yet._" : past.map(eventLine).join("\n")}

## Pages

- [Home](${siteUrl}/): movement overview, who we serve, programs, founder, and how to engage.
- [About](${siteUrl}/about): why ACW exists, vision, mission, values, and the founder's heart.
- [Our Work](${siteUrl}/our-work): identity, healing, leadership, motherhood, advocacy, and partnership.
- [Programs](${siteUrl}/programs): every signature program, who it's for, and how to engage.
- [Events](${siteUrl}/events): browse and search every upcoming and past gathering.
- [Gallery](${siteUrl}/gallery): photos and films from each gathering, filterable by event.
- [Stories](${siteUrl}/stories): testimonies, journal posts, founder reflections, and impact stories.
- [Partner With Us](${siteUrl}/partner): sponsorship, CSR, church, government, and donor pathways.
- [Contact](${siteUrl}/contact): write to ACW to join, partner, attend, invite, volunteer, or share your story.

## Site information

- Site built by [LAWAL Oyinlola](https://www.lawaloyinlola.com/) ([LinkedIn](https://www.linkedin.com/in/lawaloyinlola), [GitHub](https://github.com/lawalOyinlola))
- Content owned by A Certain Woman.
`;
}

export async function GET() {
  return new Response(buildContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
