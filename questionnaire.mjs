/**
 * Edit the questionnaire here.
 *
 * This configuration contains demonstration questions created for the UI only.
 * It is NOT a validated ADHD scale (and is not the ASRS).
 *
 * Each item in `questions` has:
 * - id: a unique identifier
 * - domain: a key defined in `domains` (labels in Italian and English)
 * - text: { it: "...", en: "..." } question text in both languages
 * - points: points for each answer, in the same order as `options`
 *   e.g. [0, 0, 1, 1, 1] or [4, 3, 2, 1, 0] (reverse scoring)
 * - options: optional { it: [...], en: [...] } choices for this question
 *
 * Results have no clinical meaning unless a validated instrument, its official
 * scoring rules, and the required attributions are added.
 */
export const questionnaire = {
  title: { it: "Questionario per adulti", en: "Adult questionnaire" },
  demo: true,
  domains: {
    attention: { it: "Attenzione e organizzazione", en: "Attention and organization" },
    restlessness: { it: "Irrequietezza e impulsività", en: "Restlessness and impulsivity" },
  },
  options: {
    it: ["Mai", "Raramente", "Qualche volta", "Spesso", "Molto spesso"],
    en: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
  },
  questions: [
    {
      id: "focus-1",
      domain: "attention",
      text: { it: "Quanto spesso ti capita di perdere il filo di un'attività quando vieni interrotto/a?", en: "How often do you lose track of an activity when you are interrupted?" },
      points: [0, 0, 1, 1, 1],
    },
    {
      id: "focus-2",
      domain: "attention",
      text: { it: "Quanto spesso rimandi l'inizio di un compito che richiede concentrazione prolungata?", en: "How often do you put off starting a task that takes sustained concentration?" },
      points: [0, 0, 0, 1, 1],
    },
    {
      id: "focus-3",
      domain: "attention",
      text: { it: "Quanto spesso ti accorgi di aver dimenticato una piccola incombenza quotidiana?", en: "How often do you realize you have forgotten a small everyday task?" },
      points: [0, 0, 1, 1, 1],
    },
    {
      id: "move-1",
      domain: "restlessness",
      text: { it: "Quanto spesso senti il bisogno di muoverti quando devi rimanere seduto/a a lungo?", en: "How often do you feel the need to move when you have to stay seated for a long time?" },
      points: [0, 0, 0, 1, 1],
    },
    {
      id: "move-2",
      domain: "restlessness",
      text: { it: "Quanto spesso ti capita di parlare prima che l'altra persona abbia finito la frase?", en: "How often do you speak before the other person has finished their sentence?" },
      points: [0, 0, 0, 1, 1],
    },
  ],
  // Optional: use only when the instrument has documented, validated thresholds.
  // A band is: { min: 0, max: 2, label: { it: "...", en: "..." }, description: { it: "...", en: "..." } }
  // Do not add arbitrary thresholds or percentages presented as diagnoses.
  bands: [],
};
