# Amınoğlu-Zombie

Ein 3D-Zombie-Survival-Spiel fürs Handy — komplett in einer einzigen `index.html`,
ohne externe Bibliotheken, Bilder oder Sounddateien.

## Spielen

`index.html` im Browser öffnen. Fertig.

## Spielprinzip

Top-Down-Survival: Du bewegst dich, **geschossen wird automatisch** auf den
nächstgelegenen Gegner. Überlebe so lange wie möglich, während die Horde
immer stärker wird.

* **Steuerung:** Linke Bildschirmhälfte = Joystick (erscheint, wo du hintippst),
  Button rechts unten = Dash (kurz unverwundbar). Am Desktop: WASD / Pfeiltasten, Leertaste = Dash, Esc = Pause.
* **Level-Ups:** Blaue Kristalle einsammeln, dann eine von drei zufälligen
  Verbesserungen wählen (16 Upgrades, u. a. Schaden, Feuerrate, Durchschlag,
  Schutzkugeln, Sprengmunition).
* **Gegner:** Walker, Runner, Brute, Spitter und Bomber — Leben, Tempo und
  Schaden skalieren mit der Überlebenszeit. Alle ~105 Sekunden kommt ein Boss.
* **Highscore:** `Überlebenszeit × 5 + Kills × 10`, pro Charakter lokal gespeichert.

## Charaktere

| Charakter | Rolle | Waffe |
|---|---|---|
| Ahmet | Der Panzer | Schrotflinte, viel Leben, langsam |
| Deniz | Die Schnelle | Doppelpistolen, sehr wendig |
| Hamza | Der Sprengmeister | Granatwerfer mit Flächenschaden |
| Mertcan | Der Scharfschütze | Große Reichweite, Durchschlag |
| Murat | Der Sturm | MP mit extremer Feuerrate |
| Said | Der Beschützer | Pistole, kreisende Schutzkugeln, Regeneration |

## Technik

* Eigene WebGL-Engine (WebGL2 mit Fallback auf WebGL1 + `ANGLE_instanced_arrays`).
* Alle Geometrie wird prozedural erzeugt (Box, Kugel, Zylinder, Scheibe),
  die komplette Szene läuft über instanziiertes Rendering in 6 Draw-Calls.
* Charaktere sind aus Boxen zusammengesetzt und werden per Skelett-Mathematik animiert.
* Sound wird zur Laufzeit mit der Web Audio API synthetisiert.
* Auflösung passt sich automatisch an die Bildrate an; Kamera-Zoom folgt dem Seitenverhältnis.
