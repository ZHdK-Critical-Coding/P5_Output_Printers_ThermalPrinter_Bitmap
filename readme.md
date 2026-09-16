# Drucker-Frame-Sender mit p5.js

Dieses Projekt zeigt, wie man mit **p5.js** Frames eines Canvas an einen **WebSocket-fähigen Drucker** senden kann.  
Der Benutzer kann durch Mausklicks einzelne Frames an den Drucker senden, optional mit Schneidbefehl.

## Features

- Verbindung zu einem WebSocket-Drucker herstellen
- Canvas wird auf dem Bildschirm angezeigt mit:
  - Rahmen und diagonalen Linien
  - Mehreren konzentrischen Kreisen
  - Text aus einer Buchstabenkette (ZHDK)
- Asynchrones Senden von Canvas-Frames als PNG-Binärdaten
- Optionaler Schneidbefehl nach jedem Frame
- Anzeige des Druckerstatus im Browser

## Voraussetzungen

- Browser mit WebSocket-Unterstützung
- Ein Drucker oder Server, der WebSocket-Verbindungen akzeptiert und PNG-Binärdaten verarbeitet

## Verwendung

- Öffne die HTML-Seite im Browser.
- Klicke auf das Canvas, um den aktuellen Frame an den Drucker zu senden.
- Nach jedem Frame kann optional ein Schneidbefehl ausgeführt werden.
- Der Status des Druckers wird im Canvas angezeigt.

## Beispiel

- 🖤 Schwarze konzentrische Kreise und Text auf weißem Hintergrund
- ✂️ Optionaler Schneidbefehl nach jedem Frame
- ⚡ Asynchrones Senden garantiert, dass jede Server-Antwort berücksichtigt wird

## Lizenz

MIT License