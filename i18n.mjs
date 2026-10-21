/**
 * Interface translations. Add keys to BOTH languages when changing the UI.
 * The text of questions, answer choices, domains and score bands lives in
 * questionnaire.mjs, together with the scoring configuration.
 */
export const LANGUAGES = ["it", "en"];

export const messages = {
  it: {
    title: "Questionario per adulti · Un passo alla volta",
    description: "Un questionario dimostrativo essenziale, senza tracciamento né salvataggio delle risposte.",
    brand: "Un passo alla volta",
    privacy: "Nessun tracciamento",
    languageLabel: "Lingua del sito",
    introEyebrow: "QUESTIONARIO PER ADULTI",
    introHeading1: "Una domanda",
    introHeading2: "alla volta.",
    introLead: "Un posto tranquillo per rispondere con calma. Non ci sono risposte giuste o sbagliate.",
    timeFact: "Nessun limite di tempo",
    localFact: "Risposte solo sul dispositivo",
    factsLabel: "Informazioni sul questionario",
    start: "Comincia",
    demoTitle: "Prototipo dimostrativo.",
    demoText: "Le domande e i punteggi di esempio non sono uno strumento clinico validato. Non permettono di stabilire se una persona abbia ADHD.",
    question: "Domanda",
    of: "di",
    progressLabel: "Avanzamento del questionario",
    overline: "Pensa agli ultimi mesi",
    questionHint: "Scegli l'opzione che ti rappresenta meglio.",
    back: "Indietro",
    introduction: "Introduzione",
    next: "Avanti",
    summary: "Vedi il riepilogo",
    reassurance: "Puoi cambiare una risposta tornando indietro.",
    resultEyebrow: "QUESTIONARIO COMPLETATO",
    resultHeading1: "Hai finito.",
    resultHeading2: "Con calma.",
    resultLead: "Questa è soltanto una lettura numerica delle risposte. Non è una diagnosi, né una stima della probabilità di ADHD.",
    resultKicker: "PUNTEGGIO DI ESEMPIO",
    resultExplanation: "Somma dei punti configurati per ciascuna risposta.",
    domainHeading: "Dettaglio per area",
    reminderTitle: "Da ricordare.",
    reminderText: "Uno screening, anche quando validato, non sostituisce una valutazione specialistica.",
    restart: "Ricomincia",
    resetDisclaimer: "Ricominciare cancella immediatamente le risposte dalla memoria della pagina.",
    errorHeading: "Configurazione da correggere",
    errorFallback: "Errore di configurazione.",
    footer1: "Progettato per restare semplice.",
    footer2: "Zero cookie · Zero account · Zero dati inviati dall'app",
  },
  en: {
    title: "Adult questionnaire · One step at a time",
    description: "A simple demo questionnaire. No tracking and no stored answers.",
    brand: "One step at a time",
    privacy: "No tracking",
    languageLabel: "Website language",
    introEyebrow: "ADULT QUESTIONNAIRE",
    introHeading1: "One question",
    introHeading2: "at a time.",
    introLead: "A quiet place to answer at your own pace. There are no right or wrong answers.",
    timeFact: "No time limit",
    localFact: "Answers stay on this device",
    factsLabel: "Questionnaire information",
    start: "Start",
    demoTitle: "Demonstration only.",
    demoText: "The sample questions and scores are not a clinically validated instrument. They cannot determine whether someone has ADHD.",
    question: "Question",
    of: "of",
    progressLabel: "Questionnaire progress",
    overline: "Think about the past few months",
    questionHint: "Choose the option that best describes you.",
    back: "Back",
    introduction: "Introduction",
    next: "Next",
    summary: "See results",
    reassurance: "You can change an answer by going back.",
    resultEyebrow: "QUESTIONNAIRE COMPLETE",
    resultHeading1: "All done.",
    resultHeading2: "At your pace.",
    resultLead: "This is only a numerical summary of your answers. It is not a diagnosis or an estimate of the probability of ADHD.",
    resultKicker: "SAMPLE SCORE",
    resultExplanation: "Sum of the points assigned to each selected answer.",
    domainHeading: "Breakdown by area",
    reminderTitle: "Please remember.",
    reminderText: "Even validated screening cannot replace an assessment by a qualified clinician.",
    restart: "Start again",
    resetDisclaimer: "Starting again immediately clears your answers from this page's memory.",
    errorHeading: "Configuration needs attention",
    errorFallback: "Configuration error.",
    footer1: "Designed to stay simple.",
    footer2: "No cookies · No accounts · No answers sent by this app",
  },
};

export function localized(value, language) {
  if (typeof value === "string") return value;
  return value?.[language] ?? value?.it ?? "";
}

export function detectLanguage(preferred, parameter) {
  if (LANGUAGES.includes(parameter)) return parameter;
  return typeof preferred === "string" && /^en(?:-|$)/i.test(preferred) ? "en" : "it";
}
