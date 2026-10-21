# ADHD Adult Test — interfaccia statica, privacy-first

Sito statico per un questionario a domande successive: interfaccia progettata per ridurre le distrazioni, configurazione dati separata dalla UI e punteggi definiti **per singola domanda**.

**Stato: prototipo dimostrativo, NON un test diagnostico o uno screening clinicamente validato.** Le cinque domande presenti sono esempi originali. Nessun punteggio o soglia deve essere interpretato come una probabilità di ADHD.

## Caratteristiche

- Una sola domanda per schermata, risposte grandi, navigazione avanti/indietro.
- Accessibilità: etichette associate, tastiera, focus visibile, colori ad alto contrasto, movimento ridotto, modalità chiara/scura del sistema.
- Score totale e per area; mapping dei punti indipendente per ogni domanda, anche invertito.
- Interfaccia interamente in italiano e inglese: pulsanti IT/EN sempre visibili, cambio lingua immediato senza perdere risposte, nessun salvataggio. Usa `?lang=en` per aprire direttamente in inglese (altrimenti segue la lingua del browser).
- Nessun framework, pacchetto npm, font esterno, CDN, API, cookie, analytics, database, login, `localStorage`, `sessionStorage` o service worker.
- Le risposte risiedono solo in una `Map` in memoria JavaScript. Chiudendo/ricaricando la pagina scompaiono. Il codice applicativo non invia risposte a server. L'hosting può comunque registrare le normali richieste HTTP nei propri log.
- Funziona su GitHub Pages senza build né GitHub Actions.

## Pubblicare su GitHub Pages

1. Apri **Settings → Pages** nel repository.
2. Imposta **Source: Deploy from a branch**, **Branch: `main`**, **Folder: `/(root)`** e salva.
3. Una volta completata la pubblicazione, l'indirizzo sarà `https://galfurian.github.io/adhd-adult-test/`.

Nessuna configurazione del `base path`: gli asset usano percorsi relativi.

## Modificare domande e scoring

Apri **`questionnaire.mjs`**. Tutte le domande e i punteggi sono lì; per aggiungerne una copia un oggetto in `questions`:

```js
{
  id: "esempio-6",                    // unico
  domain: "attenzione",               // una chiave definita in domains
  text: {
    it: "Testo della nuova domanda?",
    en: "Your new question?",
  },
  points: [0, 0, 1, 1, 1],          // punti per le 5 risposte
}
```

Le risposte comuni sono in `options.it` e `options.en`; puoi modificarle oppure definire `options: { it: [...], en: [...] }` per una singola domanda. Aggiungi SEMPRE il testo in entrambe le lingue. L'array `points` è unico (non cambia con la lingua) e deve avere esattamente lo stesso numero di elementi delle opzioni in IT ed EN. Per uno scoring inverso, usa per esempio `[4, 3, 2, 1, 0]`. Per nuove aree, aggiungi in `domains` una chiave con etichette `{ it: "...", en: "..." }`. Le stringhe dell'interfaccia sono in `i18n.mjs`.

I risultati numerici sono generati in `scoring.mjs`, che non usa il DOM e può essere testato separatamente. Il comportamento dell'interfaccia è in `app.mjs`, lo stile in `styles.css`.

### Fasce interpretative (facoltative)

`bands: []` è intenzionalmente vuoto. Quando sostituisci gli esempi con **uno strumento validato** puoi configurare le fasce documentate, ad esempio:

```js
bands: [
  { min: 0, max: 3,
    label: { it: "Etichetta documentata", en: "Documented category" },
    description: { it: "Descrizione e riferimento.", en: "Description and reference." } },
]
```

Questo esempio **non** è una soglia clinica: i valori sono puramente illustrativi. Le fasce compaiono soltanto se `demo: false`, il questionario è completo e lo score rientra nell'intervallo. L'app non genera percentuali di "probabilità ADHD".

Usa solo domande e cut-off per cui disponi dei diritti e di evidenza scientifica appropriata; mantieni le attribuzioni richieste dallo strumento. Per lo screening dell'ADHD negli adulti, lo score non è una diagnosi.

## Provare il sito in locale

```bash
python3 -m http.server 8000
```

Apri `http://localhost:8000/`. Per i test automatici del motore di scoring (Node.js 20+):

```bash
node --test tests/scoring.test.mjs
```

## Struttura

```text
index.html         pagina, semantica, accessibilità e CSP
styles.css         layout responsive, contrasto, dark mode
app.mjs            rendering, navigazione e gestione risposte in RAM
questionnaire.mjs  domande e punteggi, testi IT/EN
scoring.mjs        validazione e scoring, funzioni pure
i18n.mjs           traduzioni dell'interfaccia e selezione della lingua
tests/             test automatici senza dipendenze
.nojekyll          GitHub Pages senza trasformazioni Jekyll
```

## Privacy e sicurezza

Il CSP in `index.html` vieta connessioni JavaScript (`connect-src 'none'`) e script/stili da domini terzi. Il rendering delle domande usa `textContent` anziché HTML dinamico. Nessun salvataggio o invio delle risposte è implementato.

Se in futuro vorrai raccogliere risposte per una ricerca, serviranno un'informativa, un fondamento giuridico appropriato e una progettazione separata: **questa versione non raccoglie alcun risultato**.
## Tipografia e colori

Il progetto usa **font sans-serif di sistema** (nessun font scaricato), testo principale da 17 px, interlinea 1,65, larghezza di lettura contenuta, una domanda per schermata, controlli grandi e focus visibile. I colori sono sobri, non codificano mai da soli il significato delle risposte. La variante chiara e scura segue il sistema operativo. È stata corretta la sfumatura di testo secondario per il contrasto minimo WCAG AA.

Non esiste un font o una palette universalmente dimostrati migliori per tutte le persone con ADHD. Si seguono criteri di accessibilità cognitiva e WCAG; il test con utenti reali resta necessario. Riferimenti: https://www.w3.org/WAI/WCAG2/supplemental/objectives/o5-user-focus/ e https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.
