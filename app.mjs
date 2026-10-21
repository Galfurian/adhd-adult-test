import { questionnaire } from "./questionnaire.mjs";
import { calculateScores, validateQuestionnaire } from "./scoring.mjs";
import { LANGUAGES, messages, localized, detectLanguage } from "./i18n.mjs";

const $ = id => document.getElementById(id);
const screens = ["intro-screen", "question-screen", "result-screen", "error-screen"];
const answers = new Map(); // Memory only. Never sent, stored or persisted.
let current = 0;
let language = detectLanguage(navigator.language, new URLSearchParams(location.search).get("lang"));

function t(key) {
  return messages[language][key];
}

function renderTranslations() {
  document.documentElement.lang = language;
  document.title = t("title");
  document.querySelector('meta[name="description"]').content = t("description");
  for (const node of document.querySelectorAll("[data-i18n]")) {
    node.textContent = t(node.dataset.i18n);
  }
  for (const node of document.querySelectorAll("[data-i18n-aria-label]")) {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  }
  for (const lang of LANGUAGES) {
    $("language-" + lang).setAttribute("aria-pressed", String(lang === language));
  }
  $("question-count").textContent = `${questionnaire.questions.length} ${t("questions")}`;
}

function changeLanguage(next) {
  if (!LANGUAGES.includes(next) || next === language) return;
  language = next;
  const url = new URL(location.href);
  url.searchParams.set("lang", language);
  history.replaceState(null, "", url);
  renderTranslations();
  if (!$("question-screen").hidden) renderQuestion(false, false);
  if (!$("result-screen").hidden) renderResult(false);
}


function showScreen(id, focusId) {
  for (const name of screens) $(name).hidden = name !== id;
  if (focusId) {
    // Focus after changing visibility; no animation or forced timeouts.
    $(focusId).focus({ preventScroll: true });
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}

function createOption(label, index, selected, groupName) {
  const wrapper = document.createElement("label");
  wrapper.className = "answer-option";

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = groupName;
  radio.value = String(index);
  radio.checked = index === selected;
  radio.required = true;
  radio.addEventListener("change", () => {
    answers.set(questionnaire.questions[current].id, index);
    $("next-button").disabled = false;
  });

  const dot = document.createElement("span");
  dot.className = "answer-indicator";
  dot.setAttribute("aria-hidden", "true");
  const text = document.createElement("span");
  text.className = "answer-label";
  text.textContent = label;
  wrapper.append(radio, dot, text);
  return wrapper;
}

function renderQuestion(shouldFocus = true, navigate = true) {
  const question = questionnaire.questions[current];
  const count = questionnaire.questions.length;
  $("step-label").textContent = `${t("question")} ${current + 1} ${t("of")} ${count}`;
  $("section-label").textContent = localized(questionnaire.domains[question.domain], language);
  $("question-title").textContent = localized(question.text, language);
  const optionValues = question.options ?? questionnaire.options;
  const options = Array.isArray(optionValues) ? optionValues : optionValues[language];
  const selected = answers.get(question.id);
  $("answer-options").replaceChildren(...options.map((label, i) =>
    createOption(label, i, selected, `answer-${current}`)));
  $("back-button").textContent = `← ${current === 0 ? t("introduction") : t("back")}`;
  $("next-button").disabled = selected === undefined;
  $("next-button").textContent = `${current === count - 1 ? t("summary") : t("next")} →`;
  $("progress-track").setAttribute("aria-valuemax", String(count));
  $("progress-track").setAttribute("aria-valuenow", String(current + 1));
  $("progress-fill").style.width = `${((current + 1) / count) * 100}%`;
  if (navigate) showScreen("question-screen", shouldFocus ? "question-title" : undefined);
}

function buildDomainRow({ label, score, max }) {
  const row = document.createElement("div");
  row.className = "domain-row";
  const header = document.createElement("div");
  header.className = "domain-heading";
  const name = document.createElement("span");
  name.textContent = localized(label, language);
  const value = document.createElement("strong");
  value.textContent = `${score} / ${max}`;
  header.append(name, value);
  const bar = document.createElement("div");
  bar.className = "domain-track";
  bar.setAttribute("aria-hidden", "true");
  const fill = document.createElement("span");
  fill.style.width = `${max ? (score / max) * 100 : 0}%`;
  bar.append(fill);
  row.append(header, bar);
  return row;
}

function renderResult(navigate = true) {
  const result = calculateScores(questionnaire, answers);
  if (!result.complete) return;
  $("result-score").textContent = String(result.score);
  $("result-max").textContent = String(result.max);
  $("domain-list").replaceChildren(...Object.values(result.domains).map(buildDomainRow));
  const band = $("result-band");
  band.replaceChildren();
  band.hidden = !result.band;
  if (result.band) {
    const name = document.createElement("strong");
    name.textContent = localized(result.band.label, language);
    const note = document.createElement("p");
    note.textContent = localized(result.band.description, language);
    band.append(name, note);
  }
  if (navigate) showScreen("result-screen", "result-title");
}

function reset() {
  answers.clear();
  current = 0;
  showScreen("intro-screen", "intro-title");
}

function setup() {
  try {
    validateQuestionnaire(questionnaire);
  } catch (error) {
    renderTranslations();
    $("error-detail").textContent = language === "it" && error instanceof Error ? error.message : t("errorFallback");
    showScreen("error-screen");
    return;
  }
  renderTranslations();
  $("language-it").addEventListener("click", () => changeLanguage("it"));
  $("language-en").addEventListener("click", () => changeLanguage("en"));
  $("start-button").addEventListener("click", () => renderQuestion());
  $("back-button").addEventListener("click", () => {
    if (current === 0) return showScreen("intro-screen", "intro-title");
    current--;
    renderQuestion();
  });
  $("question-form").addEventListener("submit", event => {
    event.preventDefault();
    if (!answers.has(questionnaire.questions[current].id)) return;
    if (current === questionnaire.questions.length - 1) return renderResult();
    current++;
    renderQuestion();
  });
  $("restart-button").addEventListener("click", reset);
}

setup();