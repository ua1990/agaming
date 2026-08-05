# Amınoğlu-Zombie

Ein 3D-Zombie-Survival-Spiel fürs Handy — komplett in einer einzigen `index.html`,
ohne externe Bibliotheken, Bilder oder Sounddateien.

## Spielen

`index.html` im Browser öffnen. Fertig.

## Sprache

Im Startmenü lässt sich zwischen **Deutsch** und **Türkçe** umschalten. Übersetzt
sind alle Menüs, das HUD, die Upgrades, Charakterrollen und Waffennamen sowie die
Boss-Namen. Die Wahl wird lokal gespeichert; beim ersten Start entscheidet die
Spracheinstellung des Browsers.

## Spielprinzip

Top-Down-Survival: Du bewegst dich, **geschossen wird automatisch — und zwar in
Laufrichtung**. Zielen ist damit deine Aufgabe: Positionierung entscheidet,
vorwärts gehen heißt treffen. Eine Zielhilfe lässt sich nicht erwerben; einzig
das **Scharfschützengewehr** fängt mit seinem Zielfernrohr Gegner in einem Kegel
von 54° ein — wer immer es führt. Überlebe so lange wie möglich, während die
Horde immer stärker wird.

* **Steuerung:** Linke Bildschirmhälfte = Joystick (erscheint, wo du hintippst),
  Button rechts unten = Dash (kurz unverwundbar). Am Desktop: WASD / Pfeiltasten, Leertaste = Dash, Esc = Pause.
* **Level-Ups:** Blaue Kristalle einsammeln, dann eine von drei zufälligen
  Verbesserungen wählen (16 Upgrades, u. a. Schaden, Feuerrate, Durchschlag,
  Schutzkugeln, Sprengmunition). Jedes lässt sich bis **Stufe 10** ausbauen.
* **Fundstücke:** In unregelmäßigen Abständen erscheinen zwei Dinge in der Arena,
  beide an einer Lichtsäule von weitem erkennbar:
  * 💣 **Bombe** — alle 120 Sekunden, löscht auf einen Schlag alle Zombies aus,
    **Bosse überleben**. Die Gefallenen zählen als Kills und lassen ihre
    Kristalle fallen.
  * ❤️ **Herz** — alle 24 bis 40 Sekunden, schenkt 35 % des maximalen Lebens
    zurück, mindestens 30.

  Höchstens drei liegen gleichzeitig herum, und nie direkt vor den Füßen — man
  muss hingehen, was mitten in der Horde eine Abwägung ist. Ist die Grenze
  erreicht, verdrängt eine fällige Bombe das älteste Herz, damit ihr Takt hält.
* **Ziel:** Nach **15 Minuten** erwacht der Endgegner, *Der letzte Amınoğlu*. Wer ihn
  niederringt, gewinnt — mit 5000 Punkten Aufschlag. Die Zeitanzeige zählt in der
  zweiten Hälfte zu ihm herunter.
* **Gegner:** Walker, Runner, Brute, Spitter und Bomber — Leben, Tempo und
  Schaden skalieren mit der Überlebenszeit, der Zuwachs zieht später an. Ab fünf
  Minuten wird ein wachsender Teil der Horde zu **Elitegegnern**: mehr als
  doppelt so zäh, kräftiger eingefärbt.
* **Bosse:** Alle **3 Minuten** kommt einer, und jeder ist rund doppelt so stark
  wie der vorige (2.700 → 10.000 → 23.000 → 43.000 Leben). Sie laufen dir nicht
  bloß hinterher, sondern haben eigene Angriffe — jeder davon **angekündigt**
  (geduckte Haltung, leuchtender Ring), also ausweichbar:
  * **Sprung** — eine Landemarke erscheint dort, wo du gerade stehst; kurz
    darauf springt der Boss hinein und schlägt beim Aufkommen eine Druckwelle.
    Stehenbleiben wird bestraft.
  * **Druckwelle** — ein Ring läuft aus dem Boss nach außen. Wer schon außerhalb
    steht, bleibt heil; wer an ihm klebt, nicht.
  * **Ruf** — Verstärkung erscheint rings um **dich**, nicht um den Boss.
    Einfach wegrennen hilft also nicht mehr.
  * **Salve** (nur der Endgegner) — ein Kugelfächer in alle Richtungen, mit
    Lücken dazwischen.

  Nach jedem Angriff steht der Boss kurz still — das ist das verlässliche
  Fenster zum Zurückschlagen. Je länger der Kampf dauert, desto kürzer werden
  seine Pausen und desto schneller läuft er; aussitzen geht nicht. Dafür
  schlägt er im Nahkampf seltener zu als die Horde, weil ein Treffer ein
  Vielfaches austeilt.
* **Highscore:** `Überlebenszeit × 5 + Kills × 10`. Die **fünf besten Läufe** stehen
  in einer Bestenliste, erreichbar über das Titelmenü und direkt nach dem Tod, dort
  mit dem gerade gespielten Lauf hervorgehoben. Jeder Eintrag nennt Charakter,
  Waffe, Zeit, Kills und Level. Zusätzlich merkt sich das Spiel je Charakter den
  besten Lauf; alles lokal in `localStorage`.
* **Online-Bestenliste (optional):** Wer Läufe mit Freunden vergleichen will,
  stellt den kleinen Dienst unter [`server/`](server/) dazu — ein Cloudflare
  Worker in einer Datei. **Eingerichtet wird im Spiel selbst:** Bestenliste →
  Reiter *Freunde* → Serveradresse und frei gewählter **Raumcode**, fertig. Die
  Angaben bleiben auf dem Gerät gespeichert. Über **Einladung teilen** entsteht
  ein Link, der beides mitbringt — wer ihn antippt, ist im selben Raum, ohne
  etwas abzutippen. Nur wer denselben Code hat, sieht dieselbe Liste. Einträge
  nennen **Charakter und Waffe**, es werden keine Spielernamen vergeben. Ohne
  Einrichtung bleibt alles rein lokal und es gibt keinerlei Netzaufrufe.
  Einzelheiten und Grenzen stehen in [`server/README.md`](server/README.md).
* **Rollen:** Die Charakternamen bleiben in beiden Sprachen gleich, Rollen und
  Waffen sind übersetzt (z. B. Ahmet – „Der Panzer" / „Tank", Schrotflinte /
  Pompalı Tüfek).

## Charaktere und Waffen

Charakter und Waffe werden getrennt gewählt — **jeder Charakter kann jede Waffe
führen**, macht also 36 Kombinationen. Der Charakter bestimmt Leben, Tempo,
Aussehen und Eigenheiten; die Waffe bestimmt Schaden, Feuerrate und Reichweite.
Beim Anwählen eines Charakters springt die Auswahl auf seine Stammwaffe; sie ist
auch beim Aufrufen des Spiels schon gesetzt, es lässt sich also nie ohne Waffe
starten.

| Charakter | Rolle | Eigenheit | Stammwaffe |
|---|---|---|---|
| Ahmet | Der Panzer | 165 HP, langsam | Schrotflinte |
| Deniz | Die Schnelle | 92 HP, sehr schnell | Doppelpistolen |
| Hamza | Der Sprengmeister | 118 HP, ausgewogen | Granatwerfer |
| Mertcan | Der Scharfschütze | +12 % Krit-Chance | Scharfschützengewehr |
| Murat | Der Sturm | 105 HP, ohne Schwäche | Maschinenpistole |
| Said | Der Beschützer | Schutzkugeln, Regeneration | Pistole |

| Waffe | Kennzeichen |
|---|---|
| Schrotflinte | fünf Kugeln auf einmal, kurze Reichweite |
| Doppelpistolen | schnell und treffsicher, mittlere Reichweite |
| Granatwerfer | Flächenschaden, trifft ganze Gruppen |
| Scharfschützengewehr | weiteste Reichweite, durchbohrt Gegner, **Zielfernrohr (54°)** |
| Maschinenpistole | Dauerfeuer, streut leicht |
| Pistole | kräftiger Einzelschuss, gute Reichweite |

## Klang

Die Geräusche werden zur Laufzeit mit der Web Audio API synthetisiert, es gibt
also keine Audiodateien als separaten Download. Für **Level-Up** und **Sterben**
liegen stattdessen eigene Aufnahmen als Daten-URI in `SAMPLES`, unverändert im
Originalformat (AAC/M4A) direkt in der HTML eingebettet. Fehlt eine Aufnahme oder
lässt sie sich nicht dekodieren — etwa in einem Chromium-Build ohne AAC —, greift
automatisch wieder der synthetisierte Klang; das Spiel bleibt in jedem Fall hörbar.

Eigene Aufnahmen ersetzen: Datei als `data:audio/mp4;base64,...` (oder
`audio/mpeg` für MP3) unter `src` eintragen, `gain` daneben regelt die
Abspiellautstärke. Kurze Aufnahmen mit **weichem Ein- und Ausblenden** verwenden:
ein Pegelsprung von null auf voll knackt auf jedem Gerät hörbar.

## Technik

* Eigene WebGL-Engine (WebGL2 mit Fallback auf WebGL1 + `ANGLE_instanced_arrays`).
* Alle Geometrie wird prozedural erzeugt (Box, Kugel, Zylinder, Scheibe),
  die komplette Szene läuft über instanziiertes Rendering in 6 Draw-Calls.
* Charaktere sind aus Boxen zusammengesetzt und werden per Skelett-Mathematik animiert.
* Sound wird zur Laufzeit mit der Web Audio API synthetisiert.
* Auflösung passt sich automatisch an die Bildrate an; Kamera-Zoom folgt dem Seitenverhältnis.
