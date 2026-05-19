export type ACWEvent = {
  id: string;
  status: "LATEST" | "NEXT" | "UPCOMING";
  date: string;
  title: string;
  subtitle: string;
  location: string;
  cover: string;
  blurb: string;
  photos: string[];
  hasVideo: boolean;
  speakers: string[];
  program: { time: string; item: string }[];
};

export const EVENTS: ACWEvent[] = [
  {
    id: "reclaim-2026",
    status: "LATEST",
    date: "February 14, 2026",
    title: "Reclaim",
    subtitle: "A Day for Her",
    location: "Accra, Ghana",
    cover: "/photos/01.jpg",
    blurb:
      "Our inaugural gathering — a day of restoration, testimony, and quiet crowning. Sisters came in white and left with fire.",
    photos: [
      "/photos/01.jpg",
      "/photos/02.jpg",
      "/photos/03.jpg",
      "/photos/04.jpg",
      "/photos/05.jpg",
    ],
    hasVideo: true,
    speakers: ["Pastor Adwoa M.", "Sis. Akosua B.", "The ACW Choir"],
    program: [
      { time: "09:00", item: "Doors open · welcome breakfast" },
      { time: "10:00", item: "Worship · The opening cry" },
      { time: "11:00", item: "Keynote — Reclaiming the crown" },
      { time: "13:00", item: "Lunch & sister circles" },
      { time: "15:00", item: "Testimonies & altar moments" },
      { time: "17:00", item: "Closing — sealed and sent" },
    ],
  },
  {
    id: "becoming-circle",
    status: "NEXT",
    date: "May 23, 2026",
    title: "Becoming",
    subtitle: "A Sisterhood Circle",
    location: "Kumasi, Ghana",
    cover: "/photos/05.jpg",
    blurb:
      "A smaller, intimate circle — two hours of Scripture, journaling, and conversation among women on the long road of becoming.",
    photos: ["/photos/05.jpg", "/photos/02.jpg", "/photos/03.jpg"],
    hasVideo: false,
    speakers: ["Hosted by ACW Kumasi"],
    program: [
      { time: "15:00", item: "Tea & arrivals" },
      { time: "15:30", item: "Scripture & reflection" },
      { time: "16:30", item: "Sister-to-sister sharing" },
      { time: "17:30", item: "Prayer & sending" },
    ],
  },
  {
    id: "fire-retreat",
    status: "UPCOMING",
    date: "August 8–10, 2026",
    title: "Fire",
    subtitle: "A Three-Day Retreat",
    location: "Aburi Hills",
    cover: "/photos/04.jpg",
    blurb:
      "Three days away from noise — for the woman who needs to be reminded who she is. Worship, walks, and the slow renewing of fire.",
    photos: ["/photos/04.jpg", "/photos/01.jpg", "/photos/03.jpg"],
    hasVideo: false,
    speakers: ["ACW Leadership Team"],
    program: [
      { time: "Day 1", item: "Arrival, settle, opening worship" },
      { time: "Day 2", item: "Teaching, silence, sister talks" },
      { time: "Day 3", item: "Communion & commissioning" },
    ],
  },
];

export type ACWPhoto = {
  src: string;
  alt: string;
  span: "" | "wide" | "tall";
  caption: string;
};

export const PHOTOS: ACWPhoto[] = [
  {
    src: "/photos/01.jpg",
    alt: "A Certain Woman group photo with banners",
    span: "wide",
    caption: "The gathering — guests, founders, and friends",
  },
  {
    src: "/photos/02.jpg",
    alt: "Sister sharing testimony at the mic",
    span: "tall",
    caption: "A testimony, softly spoken",
  },
  {
    src: "/photos/03.jpg",
    alt: "Sisters in fellowship",
    span: "",
    caption: "Fellowship in the room",
  },
  {
    src: "/photos/04.jpg",
    alt: "Mother and child at the gathering",
    span: "",
    caption: "Mothers, daughters, and the ones they carry",
  },
  {
    src: "/photos/05.jpg",
    alt: "The volunteer team in white",
    span: "wide",
    caption: "The volunteer team — sisters who served",
  },
];