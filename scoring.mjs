/** Pure functions: no DOM, no network, no storage. */

export function validateQuestionnaire(config) {
  if (!config || typeof config !== "object") throw new Error("Questionario mancante.");
  if (!config.domains || typeof config.domains !== "object" || Array.isArray(config.domains)) {
    throw new Error("Definisci le aree in domains.");
  }
  if (!Array.isArray(config.questions) || config.questions.length === 0) {
    throw new Error("Aggiungi almeno una domanda a questions.");
  }
  const ids = new Set();
  for (const [index, question] of config.questions.entries()) {
    const name = `Domanda ${index + 1}`;
    if (typeof question.id !== "string" || !question.id.trim() || ids.has(question.id)) {
      throw new Error(`${name}: id mancante o duplicato.`);
    }
    ids.add(question.id);
    if (typeof question.text !== "string" || !question.text.trim()) {
      throw new Error(`${name}: testo mancante.`);
    }
    if (!Object.hasOwn(config.domains, question.domain) ||
        typeof config.domains[question.domain] !== "string") {
      throw new Error(`${name}: area non definita in domains.`);
    }
    const options = question.options ?? config.options;
    if (!Array.isArray(options) || options.length < 2 ||
        options.some(option => typeof option !== "string" || !option.trim())) {
      throw new Error(`${name}: specifica almeno due opzioni testuali.`);
    }
    if (!Array.isArray(question.points) || question.points.length !== options.length ||
        question.points.some(point => typeof point !== "number" || !Number.isFinite(point) || point < 0)) {
      throw new Error(`${name}: points deve contenere un numero >= 0 per ogni opzione.`);
    }
  }
  if (config.bands !== undefined) {
    if (!Array.isArray(config.bands)) throw new Error("bands deve essere un array.");
    for (const band of config.bands) {
      if (typeof band.min !== "number" || typeof band.max !== "number" ||
          band.min > band.max || typeof band.label !== "string" ||
          typeof band.description !== "string") {
        throw new Error("Una fascia di scoring in bands non e' valida.");
      }
    }
  }
  return true;
}

/** answers: Map(question id -> zero-based selected option index). */
export function calculateScores(config, answers) {
  validateQuestionnaire(config);
  if (!(answers instanceof Map)) throw new TypeError("answers deve essere una Map.");

  const domains = Object.fromEntries(Object.entries(config.domains).map(([key, label]) => [
    key, { label, score: 0, max: 0, answered: 0 },
  ]));
  const questions = [];
  let score = 0;
  let max = 0;
  let answered = 0;

  for (const q of config.questions) {
    const selected = answers.get(q.id);
    const maxPoints = Math.max(...q.points);
    const domain = domains[q.domain];
    domain.max += maxPoints;
    max += maxPoints;
    if (selected === undefined) continue;
    const options = q.options ?? config.options;
    if (!Number.isInteger(selected) || selected < 0 || selected >= options.length) {
      throw new RangeError(`Risposta non valida per ${q.id}.`);
    }
    const points = q.points[selected];
    domain.score += points;
    domain.answered++;
    score += points;
    answered++;
    questions.push({ id: q.id, domain: q.domain, selected, points, max: maxPoints });
  }

  const complete = answered === config.questions.length;
  // No interpretation for incomplete forms or demonstration datasets.
  const band = complete && !config.demo
    ? (config.bands ?? []).find(b => score >= b.min && score <= b.max) ?? null
    : null;
  return { score, max, answered, complete, domains, questions, band };
}