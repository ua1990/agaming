/* Amınoğlu-Zombie — Bestenliste für Freundeskreise
 *
 * Eine einzelne Cloudflare-Worker-Datei. Sie kennt zwei Aufrufe:
 *
 *   GET  /?raum=CODE   -> { raum, eintraege: [...] }
 *   POST /?raum=CODE   -> Eintrag hinzufügen, liefert die neue Liste
 *
 * Der Raumcode ist das einzige Zugangsmittel: Wer ihn nicht kennt, findet die
 * Liste nicht. Das ist kein Schutz gegen jemanden, der gezielt sucht, aber es
 * hält getrennte Freundeskreise sauber auseinander.
 *
 * Ein Browserspiel schickt seine Punkte selbst — verlässlich gegen Schummeln
 * ist das nicht. Deshalb rechnet der Server die Punkte aus Zeit und Kills
 * selbst nach, statt dem eingesandten Wert zu glauben, und weist offensichtlich
 * unmögliche Läufe ab.
 */

const MAX_EINTRAEGE = 20;
const KOPF = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
};

const antwort = (daten, status = 200) =>
  new Response(JSON.stringify(daten), { status, headers: { ...KOPF, 'Content-Type': 'application/json' } });

// Steuerzeichen und spitze Klammern raus, damit nichts als Auszeichnung wirkt
const STEUERZEICHEN = new RegExp('[\\u0000-\\u001f\\u007f<>]', 'g');
const text = (v, max) =>
  typeof v === 'string' ? v.replace(STEUERZEICHEN, '').trim().slice(0, max) : '';

const zahl = (v, min, max) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= min && n <= max ? n : null;
};

/* Nimmt den eingesandten Lauf entgegen und gibt einen sauberen Eintrag
   zurück — oder null, wenn er unbrauchbar ist. */
function pruefe(b) {
  const zeit = zahl(b && b.time, 0, 7200);          // höchstens zwei Stunden
  const kills = zahl(b && b.kills, 0, 100000);
  const lvl = zahl(b && b.lvl, 1, 500);
  if (zeit === null || kills === null || lvl === null) return null;
  // Mehr als 40 Kills je Sekunde schafft niemand — solche Läufe fliegen raus
  if (kills > 40 * zeit + 200) return null;
  return {
    name: text(b && b.name, 16) || 'Anonym',
    char: text(b && b.char, 16) || '?',
    wp: text(b && b.wp, 12) || '?',
    time: Math.round(zeit * 100) / 100,
    kills: Math.round(kills),
    lvl: Math.round(lvl),
    // Punkte werden nachgerechnet, der eingesandte Wert wird nicht verwendet
    score: Math.round(zeit * 5 + kills * 10),
    ts: Date.now(),
  };
}

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: KOPF });

    const url = new URL(req.url);
    const raum = (url.searchParams.get('raum') || '').trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]{2,31}$/.test(raum)) {
      return antwort({ fehler: 'Raumcode fehlt oder ist ungültig (3 bis 32 Zeichen: a-z, 0-9, Bindestrich)' }, 400);
    }
    const schluessel = 'raum:' + raum;

    if (req.method === 'GET') {
      const roh = await env.SCORES.get(schluessel);
      return antwort({ raum, eintraege: roh ? JSON.parse(roh) : [] });
    }

    if (req.method === 'POST') {
      let body;
      try { body = await req.json(); } catch (e) { return antwort({ fehler: 'Kein gültiges JSON' }, 400); }
      const eintrag = pruefe(body);
      if (!eintrag) return antwort({ fehler: 'Lauf unvollständig oder unplausibel' }, 400);

      const roh = await env.SCORES.get(schluessel);
      const liste = roh ? JSON.parse(roh) : [];
      liste.push(eintrag);
      liste.sort((a, b) => b.score - a.score || a.ts - b.ts);
      const gekuerzt = liste.slice(0, MAX_EINTRAEGE);
      await env.SCORES.put(schluessel, JSON.stringify(gekuerzt));

      const platz = gekuerzt.indexOf(eintrag) + 1;   // 0 heißt: nicht in der Liste
      return antwort({ raum, eintraege: gekuerzt, platz, ts: eintrag.ts });
    }

    return antwort({ fehler: 'Methode nicht erlaubt' }, 405);
  },
};
