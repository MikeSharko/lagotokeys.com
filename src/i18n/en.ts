const en = {
  meta: {
    homeTitle: "LegatoKeys — Private Piano Lessons in Rancho Peñasquitos, San Diego",
    homeDescription:
      "One-on-one piano lessons with Katerina, a St. Petersburg Conservatory graduate with 30 years of teaching experience. In-person lessons for kids, teens and adults in a home studio in Rancho Peñasquitos, San Diego.",
    blogTitle: "Blog — Tips from the piano bench",
    blogDescription:
      "Practice ideas, advice for parents and music worth learning, written by piano teacher Katerina.",
    notFoundTitle: "Page not found",
  },

  nav: {
    lessons: "Lessons",
    teacher: "Your teacher",
    location: "Location",
    blog: "Blog",
    bookTrial: "Book a trial",
    language: "Language",
    main: "Main",
  },

  pill: {
    whoLabel: "Who's learning",
    whoValue: "Child, teen or adult",
    levelLabel: "Level",
    levelValue: "Total beginner to advanced",
    lengthLabel: "Lesson length",
    lengthValue: "30 or 60 min",
    cta: "Find a time",
  },

  hero: {
    badge: "Now enrolling new students",
    title: "Private piano lessons, made around you.",
    lead: "One-on-one lessons with Katerina for kids, teens and adults — in person, in a warm and welcoming home studio in San Diego.",
    stats: [
      { value: "30 yrs", label: "teaching piano" },
      { value: "St. Petersburg", label: "Conservatory graduate" },
      { value: "EN · RU", label: "lessons in both languages" },
    ],
    illustration: "Illustration of piano keys",
    trialTitle: "Trial lesson · 30 min",
    trialText: "Meet, play, make a plan",
    fromPrice: (price: string) => `From $${price} / lesson`,
  },

  lessons: {
    chips: [
      "All lessons",
      "Young beginners",
      "Teens",
      "Adults",
      "Classical",
      "Pop & film",
      "Concerts",
      "Music theory",
    ],
    cards: [
      { title: "First steps for young kids", meta: "30 min · weekly", badge: "Most popular" },
      { title: "Teens: technique & repertoire", meta: "30 or 60 min · weekly", badge: "" },
      { title: "Adults, from zero", meta: "30 or 60 min · weekly", badge: "New" },
      { title: "Advanced & concert repertoire", meta: "60 min · weekly", badge: "" },
    ],
    perLesson: "/ lesson",
    whichLength: "Which length is right?",
    min30: "30 min",
    min60: "60 min",
    short: "young kids & first-year beginners",
    long: "progressing students, teens & adults",
  },

  teacher: {
    name: "Katerina",
    role: "Piano teacher",
    stats: [
      { value: "30", label: "Years teaching" },
      { value: "250+", label: "Students taught" },
      { value: "St. Petersburg", label: "Conservatory graduate" },
    ],
    title: "Meet your teacher",
    text: "Katerina is a graduate of the St. Petersburg Conservatory and has been teaching piano for 30 years. More than 250 students — young beginners, teens and adults — have learned to play with her, one lesson at a time.",
    perks: [
      {
        title: "A plan built for each student",
        text: "Goals, pieces and pace chosen together — not a one-size-fits-all book.",
      },
      {
        title: "Real music from day one",
        text: "Classical, pop and film songs your student actually wants to play.",
      },
      {
        title: "Lessons in English & Russian",
        text: "Comfortable for kids and parents alike — including bilingual families.",
      },
    ],
  },

  concerts: {
    eyebrow: "Student concerts",
    title: "Twice a year, students take the stage.",
    text: "About every six months, students play for family and friends. It gives everyone a real goal to work toward — and a moment to be proud of.",
    tags: ["Every six months", "Family & friends welcome", "A goal to practice for"],
    illustration: "Illustration: a piano keyboard under a spotlight",
  },

  studio: {
    photo: "Photo — the piano room at home",
    inPerson: "In-person lessons only",
    title: "Lessons in a home studio",
    text: (piano: string) =>
      `Every lesson happens in person, in Katerina's home, at a real ${piano} piano. A calm, familiar space where students feel at ease, and where good posture, touch and sound come naturally.`,
    area: "Rancho Peñasquitos, San Diego, CA",
    areaNote: "Exact address shared after booking",
    hoursNote: "After-school and weekend times",
    parking: "Plenty of street parking",
    parkingNote: "Parents are welcome to wait",
    nearby: "A short drive from",
    neighborhoods: [
      "Torrey Highlands",
      "Black Mountain Ranch",
      "Carmel Mountain",
      "Sabre Springs",
      "Mira Mesa",
      "Poway",
    ],
  },

  homeBlog: {
    title: "Tips from the piano bench",
    text: "Practice ideas, parent guides and music to fall in love with.",
    link: "Read the blog",
  },

  cta: {
    title: "Your first lesson starts with a hello.",
    text: "Book a 30-minute trial — no commitment, no pressure.",
    book: "Book a trial lesson",
    call: "Call or text",
  },

  blog: {
    title: "Tips from the piano bench",
    lead: "Practice ideas, advice for parents and music worth learning — written by Katerina.",
    search: "Search articles",
    filter: "Filter by topic",
    all: "All",
    featured: "Featured",
    empty: "No articles here yet — check back soon.",
    ctaTitle: "Reading is great. Playing is better.",
    ctaText: "Book a 30-minute trial lesson in the home studio.",
    minRead: (n: number) => `${n} min read`,
    breadcrumb: "Breadcrumb",
    keepReading: "Keep reading",
    writtenBy: "Written by Katerina",
    authorBio:
      "St. Petersburg Conservatory graduate with 30 years of teaching experience. Teaches kids, teens and adults in her home studio in San Diego.",
    coverAlt: "Cover illustration: piano keys",
    tip: "Teacher's tip",
    min: "min",
  },

  categories: {
    practice: "Practice",
    parents: "For parents",
    adults: "Adults",
    repertoire: "Repertoire",
    gear: "Gear",
  },

  trial: {
    label: "Book a trial lesson",
    perTrial: "/ trial lesson · 30 min",
    who: "Who's learning",
    whoOptions: ["Child (under 12)", "Teen", "Adult"],
    experience: "Experience",
    experienceOptions: ["Complete beginner", "Some lessons before", "Intermediate or advanced"],
    request: "Request a trial lesson",
    note: "No commitment — just meet and play.",
    where: "In-person, home studio in Rancho Peñasquitos",
    callText: (phone: string) => `Or call / text ${phone}`,
    emailSubject: "Trial piano lesson",
    emailBody: (who: string, level: string) =>
      `Hi Katerina,\n\nI'd like to book a trial lesson.\n\nWho's learning: ${who}\nExperience: ${level}\n\nThank you!`,
  },

  footer: {
    tagline: "Private piano lessons in San Diego, CA",
    lessons: "Lessons",
    kids: "Kids",
    teens: "Teens",
    adults: "Adults",
    studio: "Studio",
    about: "About",
    blog: "Blog",
    contact: "Contact",
  },

  notFound: {
    title: "This page took a wrong note.",
    text: "The page you're looking for doesn't exist or has moved.",
    home: "Back to the home page",
  },
};

export default en;
export type Dictionary = typeof en;
