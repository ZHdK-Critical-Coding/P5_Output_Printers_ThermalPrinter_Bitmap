# P5.js: Thermal Printer Bitmap

[Deutsch](README_DE.md)

Draws a square graphic (frame, diagonals, circles and a letter of "ZHDK")
and sends it as a PNG to a thermal printer server over WebSocket on every
mouse click. After each print the paper is cut. A starting point for
printing your own p5 drawings on a receipt printer.

## Installation

Requirements: a browser on the same network as the Pi (see Server).

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not used).

License: MIT

## Server

Needs `printer-websockets` from
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi),
running on a Raspberry Pi with an ESC/POS thermal printer on USB, port
8080. After `npm install` (see its readme for the `escpos-usb` fix), start
it first with `bash run.sh` in the folder on the Pi; it prints its address.
It takes a PNG as binary and the string `cut`, and answers `ok` (or `busy`
while printing). Put its address in `printerConnection` at the top of
`sketch.js` (default `ws://10.21.3.49:8080`).

## How to Run

1. Make sure the printer server is running (see Server).
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
