# P5.js: Thermal Printer Bitmap

[English](readme.md)

Zeichnet eine quadratische Grafik (Rahmen, Diagonalen, Kreise und ein
Buchstabe aus "ZHDK") und schickt sie bei jedem Mausklick als PNG per
WebSocket an einen Thermodrucker-Server. Nach jedem Druck wird das Papier
abgeschnitten. Ein Ausgangspunkt, um eigene p5-Zeichnungen auf einem
Bondrucker auszugeben.

## Installation

Voraussetzungen: ein Browser im selben Netzwerk wie der Pi (siehe Server).

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

Lizenz: MIT

## Server

Braucht `printer-websockets` aus
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi),
auf einem Raspberry Pi mit einem ESC/POS-Thermodrucker an USB, Port 8080.
Nach `npm install` (für den `escpos-usb`-Fix siehe dessen readme) zuerst
mit `bash run.sh` im Ordner auf dem Pi starten; er druckt seine Adresse.
Er nimmt ein PNG als Binärdaten und den String `cut` an und antwortet mit
`ok` (oder `busy`, solange gedruckt wird). Seine Adresse oben in
`sketch.js` bei `printerConnection` eintragen (Standard
`ws://10.21.3.49:8080`).

## Ausführen

1. Sicherstellen, dass der Drucker-Server läuft (siehe Server).
2. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
3. Auf die Zeichenfläche klicken, um den nächsten Frame zu drucken.

## Coding-Hilfe

- **`sketch.js` → Konfiguration oben**: `printerConnection` ist die Adresse
  des Servers, `printerWidth` Breite und Höhe der Zeichenfläche in Pixeln
  (512). An die Druckbreite des eigenen Druckers anpassen.
- **`sendFrame(cut)`**: wandelt die Zeichenfläche mit `canvas.toBlob()` in
  ein PNG um und sendet es als Binärdaten. Antwortet der Server `ok`, wird
  `cut` gesendet, falls `cut` wahr ist; jede andere Antwort lässt das
  Promise scheitern.
- **`setup()`**: erstellt die Zeichenfläche mit `pixelDensity(1)` und
  `noSmooth()`, damit ein Canvas-Pixel einem Druckerpunkt entspricht, und
  öffnet den WebSocket. Der Verbindungsstatus wird in `printerState`
  gespeichert und in einer Textzeile (`statusLabel`) unter der Zeichenfläche
  angezeigt.
- **`draw()`**: zeichnet die Grafik schwarz auf weiss und aktualisiert die
  Statuszeile. Der Status ist ein HTML-Element und nicht Teil der
  Zeichenfläche, er wird also nicht mitgedruckt. Diesen Teil durch
  eigene Zeichnungen ersetzen – Thermodrucker drucken nur schwarz-weiss.
- **`mousePressed()`**: wechselt zum nächsten Buchstaben und ruft nach
  100 ms `sendFrame(true)` auf, damit der neue Buchstabe schon gezeichnet
  ist.
