# P5.js: Thermal Printer Bitmap

[English](readme.md)

Zeichnet eine quadratische Grafik (Rahmen, Diagonalen, Kreise und ein
Buchstabe aus "ZHDK") und schickt sie bei jedem Mausklick als PNG per
WebSocket an einen Thermodrucker-Server. Nach jedem Druck wird das Papier
abgeschnitten. Ein Ausgangspunkt, um eigene p5-Zeichnungen auf einem
Bondrucker auszugeben.

## Installation

Voraussetzungen: ein Thermodrucker-Server, der PNG-Daten per WebSocket
annimmt, mit `ok` antwortet und im Netzwerk deines Computers erreichbar
ist.

In `sketch.js` `printerConnection` auf die Adresse des Servers setzen
(Standard `ws://10.21.3.49:8080`).

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

Lizenz: MIT

## Ausführen

1. Sicherstellen, dass der Drucker-Server läuft.
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
