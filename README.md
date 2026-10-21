# ADHD Adult Test — interfaccia statica, privacy-first

Sito statico per un questionario a domande successive: interfaccia progettata per ridurre le distrazioni, configurazione dati separata dalla UI e punteggi definiti **per singola domanda**.

**Stato: prototipo dimostrativo, NON un test diagnostico o uno screening clinicamente validato.** Le cinque domande presenti sono esempi originali. Nessun punteggio o soglia deve essere interpretato come una probabilità di ADHD.

## Caratteristiche

- Una sola domanda per schermata, risposte grandi, navigazione avanti/indietro.
- Accessibilità: etichette associate, tastiera, focus visibile, colori ad alto contrasto, movimento ridotto, modalità chiara/scura del sistema.
- Score totale e per area; mapping dei punti indipendente per ogni domanda, anche invertito.
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
  text: "Testo della nuova domanda?",
  points: [0, 0, 1, 1, 1],          // punti per le 5 risposte
}
```

Le risposte comuni sono nell'array `options`; puoi modificarle oppure specificare `options: [...]` su una singola domanda. L'array `points` deve avere esattamente lo stesso numero di elementi delle opzioni disponibili. Per uno scoring inverso, puoi usare per esempio `[4, 3, 2, 1, 0]`. Per nuove aree, aggiungi una chiave e la relativa etichetta nell'oggetto `domains`.

I risultati numerici sono generati in `scoring.mjs`, che non usa il DOM e può essere testato separatamente. Il comportamento dell'interfaccia è in `app.mjs`, lo stile in `styles.css`.

### Fasce interpretative (facoltative)

`bands: []` è intenzionalmente vuoto. Quando sostituisci gli esempi con **uno strumento validato** puoi configurare le fasce documentate, ad esempio:

```js
bands: [
  { min: 0, max: 3, label: "Etichetta definita dallo studio", description: "Descrizione e riferimento." },
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
questionnaire.mjs  dati delle domande e punteggi, da personalizzare
scoring.mjs        validazione e scoring, funzioni pure
tests/             test automatici senza dipendenze
.nojekyll          GitHub Pages senza trasformazioni Jekyll
```

## Privacy e sicurezza

Il CSP in `index.html` vieta connessioni JavaScript (`connect-src 'none'`) e script/stili da domini terzi. Il rendering delle domande usa `textContent` anziché HTML dinamico. Nessun salvataggio o invio delle risposte è implementato.

Se in futuro vorrai raccogliere risposte per una ricerca, serviranno un'informativa, un fondamento giuridico appropriato e una progettazione separata: **questa versione non raccoglie alcun risultato**.