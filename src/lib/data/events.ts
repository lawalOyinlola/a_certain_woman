export type ACWProgramItem = { time: string; item: string };

export type ACWEventVideo = {
  src: string;
  poster?: string;
  duration?: string;
  title?: string;
};

export type ACWEvent = {
  id: string;
  date: string;
  dateISO: string;
  endDateISO?: string;
  title: string;
  subtitle: string;
  theme?: string;
  tags?: string[];
  venue?: string;
  location: string;
  cover: string;
  blurb: string;
  photos: string[];
  videos?: ACWEventVideo[];
  speakers: string[];
  program: ACWProgramItem[];
};

const launchPhotos = [
  "KCS_3444",
  "KCS_3453",
  "KCS_3458",
  "KCS_3463",
  "KCS_3465",
  "KCS_3473",
  "KCS_3486",
  "KCS_3508",
  "KCS_3512",
  "KCS_3535",
  "KCS_3545",
  "KCS_3558",
  "KCS_3570",
  "KCS_3574",
  "KCS_3582",
  "KCS_3592",
  "KCS_3639",
  "KCS_3653",
  "KCS_3658",
  "KCS_3661",
  "KCS_3676",
  "KCS_3680",
  "KCS_3681",
  "KCS_3690",
  "KCS_3695",
  "KCS_3703",
  "KCS_3710",
  "KCS_3716",
  "KCS_3723",
  "KCS_3724",
  "KCS_3738",
  "KCS_3750",
  "KCS_3754",
  "KCS_3756",
  "KCS_3760",
  "KCS_3774",
].map((n) => `/media/ACW_launch/${n}.jpg`);

const crownTablePhotos = [
  "KCS_2021",
  "KCS_2030",
  "KCS_2037",
  "KCS_2038",
  "KCS_2048",
  "KCS_2051",
  "KCS_2068",
  "KCS_2075",
  "KCS_2091",
  "KCS_2110",
  "KCS_2120",
  "KCS_2146",
  "KCS_2171",
  "KCS_2177",
  "KCS_2183",
  "KCS_2195",
  "KCS_2197",
  "KCS_2198",
  "KCS_2208",
  "KCS_2212",
  "KCS_2216",
  "KCS_2241",
  "KCS_2259",
  "KCS_2272",
  "KCS_2289",
  "KCS_2306",
  "KCS_2317",
  "KCS_2378",
  "KCS_2443",
  "KCS_3455",
].map((n) => `/media/Crown_Table/${n}.jpg`);

const faithFlowersPhotos = [
  "KCS_9594",
  "KCS_9412",
  "KCS_9414",
  "KCS_9480",
  "KCS_9501",
  "KCS_9523",
  "KCS_9530",
  "KCS_9531",
  "KCS_9532",
  "KCS_9545",
  "KCS_9549",
  "KCS_9557",
  "KCS_9561",
  "KCS_9562",
  "KCS_9573",
  "KCS_9576",
  "KCS_9585",
  "KCS_9590",
  "KCS_9598",
  "KCS_9605",
  "KCS_9608",
  "KCS_9626",
  "KCS_9632",
  "KCS_9634",
  "KCS_9635",
  "KCS_9637",
  "KCS_9639",
  "KCS_9643",
  "KCS_9644",
  "KCS_9674",
  "KCS_9743",
  "KCS_9770",
  "KCS_9784",
  "KCS_9791",
  "KCS_9794",
  "KCS_9842",
].map((n) => `/media/Faith_and_Flowers/${n}.jpg`);

const mothersDayPhotos = [
  "KCS_4982",
  "KCS_4987",
  "KCS_4989",
  "KCS_4991",
  "KCS_4993",
  "KCS_4999",
  "KCS_5002",
  "KCS_5007",
  "KCS_5022",
  "KCS_5038",
  "KCS_5041",
  "KCS_5050",
  "KCS_5055",
  "KCS_5057",
  "KCS_5061",
  "KCS_5067",
  "KCS_5069",
  "KCS_5073",
  "KCS_5098",
  "KCS_5112",
  "KCS_5157",
  "KCS_5158",
  "KCS_5160",
  "KCS_5162",
].map((n) => `/media/mothers_day_she_is_seen/${n}.jpg`);

export const EVENTS: ACWEvent[] = [
  {
    id: "acw-launch-2026",
    date: "February 14, 2026",
    dateISO: "2026-02-14",
    title: "Healed & Held",
    subtitle: "The Official Launch & Summit",
    theme: "God's grace in every season",
    venue: "The Church of Jesus Christ of Latter-day Saints.",
    location: "Freetown, Sierra Leone",
    cover: "/media/ACW_launch/KCS_3486.jpg",
    blurb:
      "The room where it all began. Our official launch and summit, gathered under one theme: healing is possible, purpose is still alive, and no season is wasted in the hands of God. A day of worship, reflection, teaching, and the quiet unveiling of A Certain Woman: restoring hearts, reclaiming crowns, raising women who are healed, whole, and ready to serve.",
    photos: launchPhotos,
    speakers: [],
    program: [],
  },
  {
    id: "crown-table-spotlight-2026",
    date: "March 28, 2026",
    dateISO: "2026-03-28",
    title: "The Crown Table",
    subtitle: "Spotlight Breakfast",
    theme: "Honoring her bloom · crowned in her season",
    tags: ["Edition I"],
    venue: "The Country Lodge Hotel",
    location: "Freetown, Sierra Leone",
    cover: "/media/Crown_Table/KCS_2120.jpg",
    blurb:
      "One of our signature fellowship experiences. An intimate table where women gather to share, to heal, and to be reminded that they are daughters of worth, dignity, and divine assignment. Conversations, mentorship, prayer, sisterhood; burdens gently laid down, crowns spiritually lifted, women empowered to rise with confidence, wisdom, and grace.",
    photos: crownTablePhotos,
    videos: [
      {
        src: "/media/Crown_Table/Spotlight_breakfast_series.mp4",
        poster: "/media/Crown_Table/KCS_2030.jpg",
        title: "Spotlight Breakfast Series",
      },
    ],
    speakers: [],
    program: [],
  },
  {
    id: "faith-and-flowers-2026",
    date: "April 25, 2026",
    dateISO: "2026-04-25",
    title: "Faith & Flowers",
    subtitle: "A Sacred Wellness Brunch",
    theme: "Pause · Breathe · Bloom",
    tags: ["Edition I"],
    venue: "The Lead",
    location: "Freetown, Sierra Leone",
    cover: "/media/Faith_and_Flowers/KCS_9594.jpg",
    blurb:
      "A refreshing, beautifully curated experience that gathers spiritual reflection, creativity, and emotional renewal at one table. Through faith conversations, prayer, floral moments, and intentional fellowship, a quiet invitation to pause, breathe, bloom, and return to yourself. Just like flowers bloom in their appointed season, healing, growth, and beauty are still possible through God's grace.",
    photos: faithFlowersPhotos,
    videos: [
      {
        src: "/media/Faith_and_Flowers/VIDEO-2026-05-06-13-53-18.mp4",
        poster: "/media/Faith_and_Flowers/KCS_9573.jpg",
        title: "Faith & Flowers · Recap",
      },
    ],
    speakers: [],
    program: [],
  },
  {
    id: "mothers-day-shes-seen-2026",
    date: "May 10, 2026",
    dateISO: "2026-05-10",
    title: "She is Seen",
    subtitle: "A Mother's Day Celebration",
    theme: "Honoring the women who carry us",
    tags: ["Outreach"],
    venue: "Susan's Bay",
    location: "Freetown, Sierra Leone",
    cover: "/media/mothers_day_she_is_seen/KCS_5067.jpg",
    blurb:
      "A Mother's Day held in the heart of Susan's Bay, for the mothers who give quietly and are too rarely seen. A morning of honor, encouragement, and care, carrying dignity to women who pour out for their children and communities every day. Because she is seen, she is valued, and she is loved.",
    photos: mothersDayPhotos,
    videos: [
      {
        src: "/media/mothers_day_she_is_seen/VIDEO-2026-05-21-10-21-26.mp4",
        poster: "/media/mothers_day_she_is_seen/KCS_4989.jpg",
        title: "She is Seen · Recap",
      },
    ],
    speakers: [],
    program: [],
  },
  {
    id: "men-who-stand-launch-2026",
    date: "June 19–21, 2026",
    dateISO: "2026-06-19",
    endDateISO: "2026-06-21",
    title: "Men Who Stand",
    subtitle: "The Launch",
    theme: "Restoring strength. Redefining manhood. Building legacy.",
    tags: ["Launch"],
    location: "Freetown, Sierra Leone",
    cover: "/media/a_man_who_stands/Man_stands_event_banner_202605291622.jpeg",
    blurb:
      "A three-day celebration marking the launch of Men Who Stand, anchored in one verse: “Be on your guard; stand firm in the faith; be courageous; be strong” (1 Corinthians 16:13). Three days for men who are willing to heal, to be present, and to build something different. Honesty, faith, and the quiet work of becoming a man of character, legacy, and purpose.",
    photos: [],
    speakers: [],
    program: [],
  },
];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function endOfEventDate(e: ACWEvent): Date {
  const iso = e.endDateISO ?? e.dateISO;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function isUpcoming(e: ACWEvent, now: Date = new Date()): boolean {
  const today = startOfDay(now);
  return endOfEventDate(e) >= today;
}

export function getUpcomingEvents(now: Date = new Date()): ACWEvent[] {
  return EVENTS.filter((e) => isUpcoming(e, now)).sort((a, b) =>
    a.dateISO.localeCompare(b.dateISO),
  );
}

export function getPastEvents(now: Date = new Date()): ACWEvent[] {
  return EVENTS.filter((e) => !isUpcoming(e, now)).sort((a, b) =>
    b.dateISO.localeCompare(a.dateISO),
  );
}

export function getEventStatus(
  e: ACWEvent,
  now: Date = new Date(),
): "PAST" | "NEXT" | "UPCOMING" {
  if (!isUpcoming(e, now)) return "PAST";
  const upcoming = getUpcomingEvents(now);
  return upcoming[0]?.id === e.id ? "NEXT" : "UPCOMING";
}

export type EventBadgeState = "today" | "upcoming" | "past";

export function getEventBadgeState(
  eventId: string,
  now: Date = new Date(),
): { state: EventBadgeState; label: string } {
  const event = EVENTS.find((e) => e.id === eventId);
  if (!event) return { state: "past", label: "" };

  const today = startOfDay(now);
  const [y, m, d] = event.dateISO.split("-").map(Number);
  const startDay = new Date(y, (m ?? 1) - 1, d ?? 1);
  const endDay = endOfEventDate(event);

  // After the event has fully passed: show nothing.
  if (today.getTime() > endDay.getTime()) return { state: "past", label: "" };

  // During the event (single or multi-day): happening now.
  if (today.getTime() >= startDay.getTime())
    return { state: "today", label: "Happening Now" };

  // Before the event: show the start date.
  const label = startDay.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  return { state: "upcoming", label };
}
