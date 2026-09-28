# P5.js: Thermal Printer Bitmap

[Deutsch](README_DE.md)

Draws a square graphic (frame, diagonals, circles and a letter of "ZHDK")
and sends it as a PNG to a thermal printer server over WebSocket on every
mouse click. After each print the paper is cut. A starting point for
printing your own p5 drawings on a receipt printer.

## Installation

Requirements: a thermal printer server that accepts PNG data over
WebSocket and answers with `ok`, reachable from your computer's network.

Set `printerConnection` in `sketch.js` to the server address (default
`ws://10.21.3.49:8080`).

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not used).

License: MIT

## How to Run

1. Make sure the printer server is running.
2. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
3. Click on the canvas to print the next frame.

## Coding Help

- **`sketch.js` → config at the top**: `printerConnection` is the server
  address, `printerWidth` the width and height of the canvas in pixels
  (512). Match it to the print width of your printer.
- **`sendFrame(cut)`**: converts the canvas to a PNG with `canvas.toBlob()`
  and sends it as binary data. When the server answers `ok`, it sends `cut`
  if `cut` is true; any other answer rejects the Promise.
- **`setup()`**: creates the canvas with `pixelDensity(1)` and
  `noSmooth()` so one canvas pixel is one printer dot, and opens the
  WebSocket. The connection status is stored in `printerState` and shown
  in a text line (`statusLabel`) below the canvas.
- **`draw()`**: draws the graphic in black on white and updates the status
  line. The status is an HTML element, not part of the canvas, so it is not
  printed. Replace this part with
  your own drawing – thermal printers only print black and white.
- **`mousePressed()`**: moves on to the next letter and calls
  `sendFrame(true)` after 100 ms, so the new letter is already drawn.
