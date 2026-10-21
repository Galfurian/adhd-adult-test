/**
 * MODIFICA QUI IL QUESTIONARIO.
 *
 * Questa configurazione contiene SOLO domande dimostrative create per la UI.
 * NON e' una scala ADHD validata (non e' ASRS).
 *
 * Ogni elemento di `questions` ha:
 * - id: identificativo univoco
 * - domain: area definita in `domains` (etichette in IT e EN)
 * - text: { it: "...", en: "..." } testo nelle due lingue
 * - points: punti per ogni risposta, nello stesso ordine di `options`
 *   es. [0, 0, 1, 1, 1] oppure [4, 3, 2, 1, 0] (reverse score)
 * - options: opzionale, { it: [...], en: [...] } per opzioni specifiche
 *
 * Nessun risultato ha valore clinico finche' non vengono inseriti
 * uno strumento validato, le sue regole ufficiali e le relative attribuzioni.
 */
export const questionnaire = {
  title: { it: "Questionario per adulti", en: "Adult questionnaire" },
  demo: true,
  domains: {
    attenzione: { it: "Attenzione e organizzazione", en: "Attention and organization" },
    irrequietezza: { it: "Irrequietezza e impulsività", en: "Restlessness and impulsivity" },
  },
  options: {
    it: ["Mai", "Raramente", "Qualche volta", "Spesso", "Molto spesso"],
    en: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
  },
  questions: [
    {
      id: "focus-1",
      domain: "attenzione",
      text: { it: "Quanto spesso ti capita di perdere il filo di un'attività quando vieni interrotto/a?", en: "How often do you lose track of an activity when you are interrupted?" },
      points: [0, 0, 1, 1, 1],
    },
    {
      id: "focus-2",
      domain: "attenzione",
      text: { it: "Quanto spesso rimandi l'inizio di un compito che richiede concentrazione prolungata?", en: "How often do you put off starting a task that takes sustained concentration?" },
      points: [0, 0, 0, 1, 1],
    },
    {
      id: "focus-3",
      domain: "attenzione",
      text: { it: "Quanto spesso ti accorgi di aver dimenticato una piccola incombenza quotidiana?", en: "How often do you realize you have forgotten a small everyday task?" },
      points: [0, 0, 1, 1, 1],
    },
    {
      id: "move-1",
      domain: "irrequietezza",
      text: { it: "Quanto spesso senti il bisogno di muoverti quando devi rimanere seduto/a a lungo?", en: "How often do you feel the need to move when you have to stay seated for a long time?" },
      points: [0, 0, 0, 1, 1],
    },
    {
      id: "move-2",
      domain: "irrequietezza",
      text: { it: "Quanto spesso ti capita di parlare prima che l'altra persona abbia finito la frase?", en: "How often do you speak before the other person has finished their sentence?" },
      points: [0, 0, 0, 1, 1],
    },
  ],
  // FACOLTATIVO: solo se disponi di soglie definite e validate per lo strumento.
  // Una fascia e': { min: 0, max: 2, label: "...", description: "..." }
  // Non inserire soglie arbitrarie o percentuali interpretate come diagnosi.
  bands: [],
};