export type BarrierId =
  "racing-thoughts" | "tomorrow-worry" | "body-tension" | "sleep-anxiety" | "unsure";

export type Barrier = {
  id: BarrierId;
  label: string;
  nightLabel: string;
  description: string;
  intervention: Intervention;
  primaryDifficulty: string;
  relatedFactor: string;
  intensity: number;
  alternative: Alternative;
};

export type Intervention = {
  name: string;
  duration: string;
  category: string;
  short: string;
  reason: string;
};

export type Alternative = { name: string; duration: string; note: string };

export const defaultAlternative: Alternative = {
  name: "90-second calming breath",
  duration: "90 seconds",
  note: "Slow, longer exhales to settle the body if writing doesn't feel right tonight.",
};

const breathAlt: Alternative = defaultAlternative;

export const barriers: Barrier[] = [
  {
    id: "racing-thoughts",
    label: "Thoughts won't stop",
    nightLabel: "Thoughts won't stop",
    description: "My mind keeps jumping between thoughts.",
    primaryDifficulty: "Racing thoughts",
    relatedFactor: "Mental over-activity",
    intensity: 7,
    alternative: breathAlt,
    intervention: {
      name: "Brain Dump",
      duration: "2–3 minutes",
      category: "Worry Management",
      short: "Give repetitive thoughts somewhere else to stay for tonight.",
      reason:
        "You mentioned repetitive thoughts that keep looping. A short brain-dump activity may help you externalize those thoughts before continuing your wind-down routine.",
    },
  },
  {
    id: "tomorrow-worry",
    label: "Worried about tomorrow",
    nightLabel: "Worried about tomorrow",
    description: "I'm thinking about something that may happen tomorrow.",
    primaryDifficulty: "Racing thoughts",
    relatedFactor: "Worry about tomorrow",
    intensity: 7,
    alternative: breathAlt,
    intervention: {
      name: "Brain Dump",
      duration: "2–3 minutes",
      category: "Worry Management",
      short: "Give repetitive thoughts somewhere else to stay for tonight.",
      reason:
        "You mentioned repetitive thoughts about tomorrow. A short brain-dump activity may help you externalize those concerns before continuing your wind-down routine.",
    },
  },
  {
    id: "body-tension",
    label: "My body feels tense",
    nightLabel: "My body feels tense",
    description: "I feel restless, tense or physically anxious.",
    primaryDifficulty: "Physical restlessness",
    relatedFactor: "Body tension",
    intensity: 6,
    alternative: {
      name: "Brain Dump",
      duration: "2–3 minutes",
      note: "If thoughts start looping while you breathe, write them down instead.",
    },
    intervention: {
      name: "Guided Slow Breathing",
      duration: "4 minutes",
      category: "Body Settling",
      short: "Longer exhales to let the body come down a level.",
      reason:
        "You described physical restlessness rather than thought loops. Slower, longer exhales are a widely used self-management technique for settling physical tension.",
    },
  },
  {
    id: "sleep-anxiety",
    label: "I'm worried because I can't sleep",
    nightLabel: "I'm worried because I can't sleep",
    description: "The longer I'm awake, the more worried I become.",
    primaryDifficulty: "Worry about being awake",
    relatedFactor: "Sleep effort",
    intensity: 7,
    alternative: breathAlt,
    intervention: {
      name: "Letting Go of Sleep Effort",
      duration: "3 minutes",
      category: "Sleep Pressure Relief",
      short: "Take the pressure off falling asleep for the next few minutes.",
      reason:
        "You mentioned worry about not sleeping. Reducing the pressure to fall asleep is often more helpful than trying harder to sleep.",
    },
  },
  {
    id: "unsure",
    label: "I'm not sure",
    nightLabel: "I'm not sure",
    description: "I just know that my mind isn't settling.",
    primaryDifficulty: "Unsettled mind",
    relatedFactor: "Unspecified evening unease",
    intensity: 5,
    alternative: breathAlt,
    intervention: {
      name: "Gentle Body & Mind Scan",
      duration: "3 minutes",
      category: "Noticing",
      short: "A slow scan to notice where tonight's restlessness sits.",
      reason:
        "You weren't sure what's keeping you awake. A short scan can help you notice whether the difficulty feels more mental or physical tonight.",
    },
  },
];

export const getBarrier = (id: BarrierId | null) =>
  barriers.find((b) => b.id === id) ?? (barriers[0] as Barrier);

export const trendData = [
  { day: "Mon", quality: 6.1, anxiety: 6.8, onset: 46 },
  { day: "Tue", quality: 5.4, anxiety: 7.4, onset: 55 },
  { day: "Wed", quality: 6.9, anxiety: 5.6, onset: 38 },
  { day: "Thu", quality: 7.4, anxiety: 5.1, onset: 31 },
  { day: "Fri", quality: 6.6, anxiety: 6.0, onset: 40 },
  { day: "Sat", quality: 8.1, anxiety: 4.2, onset: 24 },
  { day: "Sun", quality: 7.6, anxiety: 4.8, onset: 27 },
];

export const insightCards = [
  "Your reported sleep quality was higher on nights when evening anxiety was below 6/10.",
  "You reported feeling better after 3 of your last 4 Brain Dump sessions.",
  "Your sleep tends to take longer on high-worry evenings.",
];

export const brainDumpItems = [
  { type: "Tomorrow Task", text: "Review presentation slides" },
  { type: "Worry", text: "What if the presentation goes badly?" },
  { type: "Reminder", text: "Email project teammate" },
];
