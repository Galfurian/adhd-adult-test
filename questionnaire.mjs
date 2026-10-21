/**
 * MODIFICA QUI IL QUESTIONARIO.
 *
 * Questa configurazione contiene SOLO domande dimostrative create per la UI.
 * NON e' una scala ADHD validata (non e' ASRS).
 *
 * Ogni elemento di `questions` ha:
 * - id: identificativo univoco
 * - domain: area definita in `domains`
 * - text: testo della domanda
 * - points: punti per ogni risposta, nello stesso ordine di `options`
 *   es. [0, 0, 1, 1, 1] oppure [4, 3, 2, 1, 0] (reverse score)
 * - options: opzionale, sovrascrive quelle comuni per una specifica domanda
 *
 * Nessun risultato ha valore clinico finche' non vengono inseriti
 * uno strumento validato, le sue regole ufficiali e le relative attribuzioni.
 */
export const questionnaire = {
  title: "Questionario per adulti",
  demo: true,
  domains: {
    attenzione: "Attenzione e organizzazione",
    irrequietezza: "Irrequietezza e impulsività",
  },
  options: ["Mai", "Raramente", "Qualche volta", "Spesso", "Molto spesso"],
  questions: [
    {
      id: "focus-1",
      domain: "attenzione",
      text: "Quanto spesso ti capita di perdere il filo di un'attività quando vieni interrotto/a?",
      points: [0, 0, 1, 1, 1],
    },
    {
      id: "focus-2",
      domain: "attenzione",
      text: "Quanto spesso rimandi l'inizio di un compito che richiede concentrazione prolungata?",
      points: [0, 0, 0, 1, 1],
    },
    {
      id: "focus-3",
      domain: "attenzione",
      text: "Quanto spesso ti accorgi di aver dimenticato una piccola incombenza quotidiana?",
      points: [0, 0, 1, 1, 1],
    },
    {
      id: "move-1",
      domain: "irrequietezza",
      text: "Quanto spesso senti il bisogno di muoverti quando devi rimanere seduto/a a lungo?",
      points: [0, 0, 0, 1, 1],
    },
    {
      id: "move-2",
      domain: "irrequietezza",
      text: "Quanto spesso ti capita di parlare prima che l'altra persona abbia finito la frase?",
      points: [0, 0, 0, 1, 1],
    },
  ],
  // FACOLTATIVO: solo se disponi di soglie definite e validate per lo strumento.
  // Una fascia e': { min: 0, max: 2, label: "...", description: "..." }
  // Non inserire soglie arbitrarie o percentuali interpretate come diagnosi.
  bands: [],
};