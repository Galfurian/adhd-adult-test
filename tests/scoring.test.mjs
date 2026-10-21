import test from 'node:test';
import assert from 'node:assert/strict';
import { questionnaire } from '../questionnaire.mjs';
import { validateQuestionnaire, calculateScores } from '../scoring.mjs';

test('configurazione demo valida', () => {
  assert.equal(validateQuestionnaire(questionnaire), true);
});

test('zero risposte: score zero e max calcolato', () => {
  const result = calculateScores(questionnaire, new Map());
  assert.equal(result.score, 0);
  assert.equal(result.max, 5);
  assert.equal(result.answered, 0);
  assert.equal(result.complete, false);
});

test('risposte e sottoscale sommate correttamente', () => {
  const selected = new Map([
    ['focus-1', 2], ['focus-2', 1], ['focus-3', 4],
    ['move-1', 3], ['move-2', 0],
  ]);
  const result = calculateScores(questionnaire, selected);
  assert.equal(result.score, 3);
  assert.equal(result.max, 5);
  assert.equal(result.domains.attenzione.score, 2);
  assert.equal(result.domains.irrequietezza.score, 1);
  assert.equal(result.complete, true);
  assert.equal(result.band, null); // demo: no clinical interpretation
});

test('score inverso e opzioni personalizzate', () => {
  const config = {
    domains: { x: 'X' },
    questions: [{ id: 'x1', domain: 'x', text: 'Q?', options: ['A','B','C'], points: [2, 1, 0] }],
  };
  assert.equal(calculateScores(config, new Map([['x1', 0]])).score, 2);
  assert.equal(calculateScores(config, new Map([['x1', 2]])).score, 0);
});

test('soglie opzionali solo fuori dalla demo', () => {
  const base = {
    demo: false, domains: { x: 'X' }, options: ['A','B'],
    questions: [{id:'a', domain:'x', text:'Q?', points:[0,1]}],
    bands: [{min:1, max:1, label:'Fascia', description:'Solo demo test'}],
  };
  assert.equal(calculateScores(base, new Map([['a',1]])).band.label, 'Fascia');
  assert.equal(calculateScores({...base,demo:true}, new Map([['a',1]])).band, null);
  assert.equal(calculateScores(base, new Map()).band, null);
});

test('configurazioni errate e risposte fuori range vengono rifiutate', () => {
  assert.throws(() => validateQuestionnaire({domains: {}, questions: []}), /almeno una domanda/);
  const broken = {...questionnaire, questions: [questionnaire.questions[0], questionnaire.questions[0]]};
  assert.throws(() => validateQuestionnaire(broken), /duplicato/);
  assert.throws(() => calculateScores(questionnaire, new Map([['focus-1', 99]])), /non valida/);
});