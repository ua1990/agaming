# Online-Bestenliste

Das Spiel läuft ohne diesen Server vollständig — die Bestenliste bleibt dann
rein lokal auf dem Gerät. Wer Läufe mit Freunden vergleichen will, stellt
diesen kleinen Dienst dazu.

## Was es ist

Eine einzelne Datei (`worker.js`) für [Cloudflare Workers](https://workers.cloudflare.com),
mit zwei Aufrufen:

```
GET  /?raum=CODE   ->  { raum, eintraege: [ … ] }
POST /?raum=CODE   ->  Lauf eintragen, liefert die neue Liste und den Platz
```

Gespeichert werden je Raum die besten 20 Läufe. Der **Raumcode** ist das
einzige Zugangsmittel: Wer ihn nicht kennt, findet die Liste nicht. Getrennte
Freundeskreise nutzen einfach getrennte Codes.

## Einrichten

Voraussetzung: ein kostenloses Cloudflare-Konto und Node.

```bash
cd server
npx wrangler login                       # einmalig, öffnet den Browser
npx wrangler kv namespace create SCORES  # legt den Speicher an
```

Der zweite Befehl gibt eine `id` aus. Diese in `wrangler.toml` bei
`id = "HIER_DIE_ID_EINTRAGEN"` einsetzen, dann:

```bash
npx wrangler deploy
```

Wrangler nennt am Ende die Adresse, etwa
`https://aminoglu-scores.dein-name.workers.dev`.

## Im Spiel eintragen

In `index.html` oben im Abschnitt `ONLINE` beides eintragen:

```js
const ONLINE = {
  url:  'https://aminoglu-scores.dein-name.workers.dev',
  raum: 'baran-clan',        // 3 bis 32 Zeichen: a-z, 0-9, Bindestrich
};
```

Bleibt eines der beiden leer, verhält sich das Spiel wie vorher: kein
Umschalter im Menü, keine Netzaufrufe.

Alle, die dieselben zwei Werte eintragen, sehen dieselbe Liste. Einträge werden
nicht mit Spielernamen versehen, sondern zeigen **Charakter und Waffe** — wer
mit Ahmet und der Schrotflinte stirbt, erscheint als „Ahmet · Schrotflinte".
Es gibt also nichts einzugeben und nichts zu verwalten.

## Kosten

Der kostenlose Tarif umfasst 100.000 Aufrufe pro Tag und 1.000 Schreibvorgänge
in den Speicher. Ein Spiel erzeugt einen Aufruf beim Ansehen der Liste und
einen pro Tod — das reicht für einen Freundeskreis um Größenordnungen.

## Was dieser Server nicht leistet

Die Punkte werden vom Browser gemeldet. Der Server rechnet sie zwar aus Zeit
und Kills **selbst nach** und weist offensichtlich Unmögliches ab (mehr als
40 Kills je Sekunde, mehr als zwei Stunden Laufzeit), aber wer sich auskennt,
kann trotzdem erfundene Werte einsenden. Verlässlich verhindern ließe sich das
nur, wenn die Spiellogik selbst auf dem Server liefe — ein völlig anderer Bau.

Für eine Liste unter Freunden ist das in Ordnung; als öffentliche Rangliste
taugt es nicht.

Es gibt keine Anmeldung, keine Spielernamen und keine Löschfunktion. Weil
Einträge nur Charakter und Waffe nennen, sind Läufe verschiedener Leute mit
demselben Charakter nicht auseinanderzuhalten. Wer eine Liste leeren will,
löscht den Schlüssel im Speicher:

```bash
npx wrangler kv key delete --binding=SCORES "raum:baran-clan"
```
