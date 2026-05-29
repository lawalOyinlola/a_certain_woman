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
  location: string;
  cover: string;
  blurb: string;
  photos: string[];
  videos?: ACWEventVideo[];
  speakers: string[];
  program: ACWProgramItem[];
};

const launchPhotos = [
  "KCS_3486",
  "KCS_3444",
  "KCS_3453",
  "KCS_3458",
  "KCS_3465",
  "KCS_3512",
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
  "KCS_3695",
  "KCS_3716",
  "KCS_3750",
  "KCS_3754",
  "KCS_3756",
  "KCS_3774",
].map((n) => `/photos/ACW_launch/${n}.jpg`);

const crownTablePhotos = [
  "KCS_2197",
  "KCS_2021",
  "KCS_2030",
  "KCS_2051",
  "KCS_2075",
  "KCS_2091",
  "KCS_2110",
  "KCS_2171",
  "KCS_2177",
  "KCS_2183",
  "KCS_2195",
  "KCS_2208",
  "KCS_2241",
  "KCS_2306",
  "KCS_2378",
].map((n) => `/photos/Crown_Table/${n}.jpg`);

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
].map((n) => `/photos/Faith_and_Flowers/${n}.jpg`);

export const EVENTS: ACWEvent[] = [
  {
    id: "acw-launch-2026",
    date: "February 14, 2026",
    dateISO: "2026-02-14",
    title: "Healed & Held",
    subtitle: "The Official Launch & Summit",
    theme: "God's grace in every season",
    location: "Freetown, Sierra Leone",
    cover: "/photos/ACW_launch/KCS_3486.jpg",
    blurb:
      "The room where it all began. Our official launch and summit, gathered under one theme: healing is possible, purpose is still alive, and no season is wasted in the hands of God. A day of worship, reflection, teaching, and the quiet unveiling of A Certain Woman: restoring hearts, reclaiming crowns, raising women who are healed, whole, and ready to serve.",
    photos: launchPhotos,
    speakers: [],
    program: [],
  },
  {
    id: "crown-table-spotlight-2026",
    date: "April 25, 2026",
    dateISO: "2026-04-25",
    title: "The Crown Table",
    subtitle: "Spotlight Breakfast",
    theme: "Honoring her bloom · crowned in her season",
    location: "Freetown, Sierra Leone",
    cover: "/photos/Crown_Table/KCS_2197.jpg",
    blurb:
      "One of our signature fellowship experiences. An intimate table where women gather to share, to heal, and to be reminded that they are daughters of worth, dignity, and divine assignment. Conversations, mentorship, prayer, sisterhood; burdens gently laid down, crowns spiritually lifted, women empowered to rise with confidence, wisdom, and grace.",
    photos: crownTablePhotos,
    videos: [
      {
        src: "/photos/Crown_Table/Spotlight_breakfast_series.mp4",
        poster: "/photos/Crown_Table/KCS_2030.jpg",
        title: "Spotlight Breakfast Series",
      },
    ],
    speakers: [],
    program: [],
  },
  {
    id: "faith-and-flowers-2026",
    date: "May 6, 2026",
    dateISO: "2026-05-06",
    title: "Faith & Flowers",
    subtitle: "A Sacred Wellness Brunch",
    theme: "Pause · Breathe · Bloom",
    location: "Freetown, Sierra Leone",
    cover: "/photos/Faith_and_Flowers/KCS_9594.jpg",
    blurb:
      "A refreshing, beautifully curated experience that gathers spiritual reflection, creativity, and emotional renewal at one table. Through faith conversations, prayer, floral moments, and intentional fellowship, a quiet invitation to pause, breathe, bloom, and return to yourself. Just like flowers bloom in their appointed season, healing, growth, and beauty are still possible through God's grace.",
    photos: faithFlowersPhotos,
    videos: [
      {
        src: "/photos/Faith_and_Flowers/VIDEO-2026-05-06-13-53-18.mp4",
        poster: "/photos/Faith_and_Flowers/KCS_9573.jpg",
        title: "Faith & Flowers · Recap",
      },
    ],
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
