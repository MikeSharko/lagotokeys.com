const en = {
  meta: {
    homeTitle: "Piano Lessons in San Diego (Rancho Peñasquitos) | LegatoKeys",
    homeDescription:
      "Piano lessons for kids, teens and adults in San Diego. Conservatory-trained teacher, lessons in English or Russian, home studio in Rancho Peñasquitos.",
    blogTitle: "Piano Tips for Parents & Beginners in San Diego",
    blogDescription:
      "Piano practice routines, advice for parents and beginner pieces from Katerina, a St. Petersburg Conservatory–trained piano teacher in Rancho Peñasquitos, San Diego.",
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
    lead: "Private piano lessons in San Diego with Katerina — for kids, teens and adults, from total beginners to advanced. In person, at a warm and welcoming home studio in Rancho Peñasquitos.",
    stats: [
      // "\n" = where the label breaks in the hero row (shown as one line on phones)
      { value: "30 yrs", label: "teaching\npiano" },
      { value: "St. Petersburg", label: "Conservatory\ngraduate" },
      { value: "EN · RU", label: "lessons in\nboth languages" },
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
    title: "Piano lessons for kids, teens and adults",
    lead: "Beginner piano lessons through advanced repertoire — classical piano, pop and film music. 30 or 60 minutes, once a week.",
    cards: [
      { title: "First piano lessons for kids", meta: "30 min · weekly", badge: "Most popular" },
      { title: "Piano lessons for teens", meta: "30 or 60 min · weekly", badge: "" },
      { title: "Piano lessons for adults", meta: "30 or 60 min · weekly", badge: "New" },
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
    title: "Your piano teacher in San Diego",
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
        text: "A Russian-speaking piano teacher in San Diego — comfortable for kids and parents alike, including bilingual families.",
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
    title: "Piano lessons in Rancho Peñasquitos",
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
      "Rancho Bernardo",
      "4S Ranch",
      "Scripps Ranch",
    ],
  },

  homeBlog: {
    title: "Tips from the piano bench",
    text: "Practice ideas, parent guides and music to fall in love with.",
    link: "Read the blog",
  },

  cta: {
    title: "Your first lesson starts with a hello.",
    text: "Book a 30-minute trial piano lesson — no commitment, no pressure.",
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
    faqTitle: "Frequently asked questions",
    aboutAuthor: "More about Katerina",
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
    area: "Rancho Peñasquitos, San Diego, CA",
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
